import 'regenerator-runtime/runtime'

import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import log4js from 'log4js'
import moment from 'moment'
import { Db, MongoClient } from 'mongodb'

import { makeAnueNewsFetchLogRepository } from 'news/anue/infrastructure/mongo-anue-news-fetch-log-repository'
import { makeAnueNewsRepository } from 'news/anue/infrastructure/mongo-anue-news-repository'
import { AnueNewsRepository, AnueNewsFetchLogRepository } from 'news/anue/repository'
import { makeFetchAnueNews } from 'news/anue/services/fetch'
import { makeAnueNewsOfMarketCode } from 'news/anue/services/anue-news-of-market-code'

const logger = log4js.getLogger('startup')

const makeInitMongoClient: () => Promise<Db> = async () => {
  const mongoUrl = process.env.mongo_url || ''

  const client = new MongoClient(mongoUrl)
  await client.connect()
  return client.db('NSC')
}

export interface Depends {
  anueNewsRepository: AnueNewsRepository
  anueNewsFetchLogRepository: AnueNewsFetchLogRepository
}

const initDepends: (db: Db) => Depends = db => {
  return {
    anueNewsRepository: makeAnueNewsRepository(db),
    anueNewsFetchLogRepository: makeAnueNewsFetchLogRepository(db),
  }
}

type AsyncHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<any>

const wrappedAsyncHandler: (handler: AsyncHandler) => AsyncHandler = handler => {
  return async (request, reply) => {
    try {
      const result = await handler(request, reply)
      return result
    } catch (e) {
      reply.type('application/json').code(500)
      logger.error(e)
      return e.message
    }
  }
}

makeInitMongoClient()
  .then(db => {
    return initDepends(db)
  })
  .then(({ anueNewsRepository, anueNewsFetchLogRepository }) => {
    const server = fastify({ logger: true })

    const fetchAnueNews = makeFetchAnueNews({
      anueNewsRepository,
      anueNewsFetchLogRepository,
    })

    server.get(
      '/anue',
      wrappedAsyncHandler(async (request, reply) => {
        reply.type('application/json').code(200)

        const defaultTime = moment()
          .startOf('day')
          .unix()

        return fetchAnueNews(defaultTime)
      }),
    )

    const anueNewsOfMarketCode = makeAnueNewsOfMarketCode({ anueNewsRepository })

    server.get(
      '/anue/ofMarketCodes',
      wrappedAsyncHandler(async (req, reply) => {
        reply.type('application/json').code(200)

        const { codes } = req.query as { codes: string }

        return anueNewsOfMarketCode(codes.split(','))
      }),
    )

    server.listen(3000, (err, address) => {
      if (err) throw err
      server.log.info(`server listening on ${address}`)
    })
  })
  .catch(e => logger.error(e))
