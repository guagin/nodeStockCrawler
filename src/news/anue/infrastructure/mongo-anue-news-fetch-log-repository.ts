/* eslint-disable no-underscore-dangle */
import { Db } from 'mongodb'

import { AnueNewsFetchLog, makeAnueNewsFetchLog } from '../model'
import { AnueNewsFetchLogRepository } from '../repository'

interface FetchedContent {
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url?: string
  prev_page_url?: string
  from: number
  to: number
  data: {
    newsId: string
    title: string
    content: string
    summary: string
    isCategoryHeadline: boolean
    publishAt: number
    categoryId: number
    fundCategoryAbbr: {
      name: string
      categoryAbbrId: string
    }
    etf: string[]
    market: {
      code: string
      name: string
      symbol: string
    }[]
    categoryName: string
  }[]
  message: string
  statusCode: number
}

interface AnueNewsFetchLogDocument {
  _id: string
  items: FetchedContent
}

export const makeAnueNewsFetchLogRepository: (db: Db) => AnueNewsFetchLogRepository = db => {
  const collection = db.collection<AnueNewsFetchLogDocument>('AnueNewsFetchLog')

  return {
    ofId: async (id: string) => {
      const result = await collection.findOne({ _id: id })

      if (!result) {
        return null
      }

      return makeAnueNewsFetchLog({
        id: result._id,
        ...result,
      })
    },
    save: async (anueNewsFetchLog: AnueNewsFetchLog) => {
      await collection.findOneAndUpdate(
        { _id: anueNewsFetchLog.id },
        {
          $set: {
            ...anueNewsFetchLog,
          },
        },
        {
          upsert: true,
        },
      )
    },
  }
}
