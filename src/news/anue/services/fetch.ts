import fetch from 'node-fetch'

import { makeAnueNews, makeAnueNewsFetchLog } from '../model'
import { AnueNewsFetchLogRepository, AnueNewsRepository } from '../repository'

interface ResponseJSON {
  items: {
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
}

// https://api.cnyes.com/media/api/v1/newslist/category/headline?limit=30&startAt=1611849600&endAt=1612799999&page=1

export const makeFetchAnueNews: (depends: {
  anueNewsRepository: AnueNewsRepository
  anueNewsFetchLogRepository: AnueNewsFetchLogRepository
}) => (startAt: number) => Promise<ResponseJSON> = ({
  anueNewsRepository,
  anueNewsFetchLogRepository,
}) => {
  return async startAt => {
    const saved = await anueNewsFetchLogRepository.ofId(`${startAt}`)

    if (saved) {
      return saved
    }

    const url = `https://api.cnyes.com/media/api/v1/newslist/category/headline?limit=30&startAt=${startAt}`

    const response = await fetch(url)

    const json = (await response.json()) as ResponseJSON

    await anueNewsFetchLogRepository.save(
      makeAnueNewsFetchLog({
        id: `${startAt}`,
        items: json.items,
      }),
    )

    await anueNewsRepository.saveMany(
      json.items.data.map(e =>
        makeAnueNews({
          id: e.newsId,
          publishedAt: new Date(e.publishAt * 1000),
          title: e.title,
          content: e.content,
          markets: e.market,
        }),
      ),
    )
    return json
  }
}
