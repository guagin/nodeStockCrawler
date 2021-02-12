/* eslint-disable no-underscore-dangle */
import { Db } from 'mongodb'

import { AnueNews, makeAnueNews } from '../model'
import { AnueNewsRepository } from '../repository'

export interface Market {
  code: string
  name: string
  symbol: string
}

interface AnueNewsDocument {
  _id: string
  publishedAt: Date
  title: string
  content: string
  markets: Market[]
}

export const makeAnueNewsRepository: (db: Db) => AnueNewsRepository = db => {
  const collection = db.collection<AnueNewsDocument>('AnueNews')
  return {
    ofDateRange: async ({
      startAt,
      endAt,
      count,
      page,
    }: {
      startAt: Date
      endAt: Date
      count: number
      page: number
    }) => {
      const skipCount = (page - 1) * count

      const docs = await collection
        .find({
          publishedAt: {
            $gte: startAt,
            $lt: endAt,
          },
        })
        .skip(skipCount)
        .limit(count)
        .toArray()

      const totalCount = await collection.count({
        publishedAt: {
          $gte: startAt,
          $lt: endAt,
        },
      })

      const totalPages = Math.ceil(totalCount / count)

      return {
        page,
        totalCount,
        totalPages,
        data: docs.map(e =>
          makeAnueNews({
            id: e._id,
            ...e,
          }),
        ),
      }
    },
    ofMarketCodes: async (codes: string[]) => {
      const results = await collection.find({ 'markets.code': { $in: codes } }).toArray()

      if (!results.length) {
        return []
      }

      return results.map(e =>
        makeAnueNews({
          id: e._id,
          ...e,
        }),
      )
    },
    save: async (anueNews: AnueNews) => {
      await collection.findOneAndUpdate(
        {
          _id: anueNews.id,
        },
        {
          $set: {
            publishedAt: anueNews.publishedAt,
            title: anueNews.title,
            content: anueNews.content,
            markets: anueNews.markets,
          },
        },
      )
    },

    saveMany: async (anueNews: AnueNews[]) => {
      await collection.insertMany(
        anueNews.map(e => ({
          _id: e.id,
          markets: e.markets,
          publishedAt: e.publishedAt,
          title: e.title,
          content: e.content,
        })),
      )
    },
  }
}
