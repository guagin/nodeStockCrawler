import 'regenerator-runtime/runtime'

import fastify from 'fastify'

import { makeFetchNews } from 'yahoo'

const server = fastify({ logger: true })

server.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

const fetchNews = makeFetchNews({})

server.get('/yahooNews', async (request, reply) => {
  reply.type('application/json').code(200)
  return fetchNews()
})

server.listen(3000, (err, address) => {
  if (err) throw err
  server.log.info(`server listening on ${address}`)
})
