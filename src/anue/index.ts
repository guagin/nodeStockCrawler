import fetch from 'node-fetch'
import cheerio from 'cheerio'

// https://api.cnyes.com/media/api/v1/newslist/category/headline?limit=30&startAt=1611849600&endAt=1612799999&page=1

export const makeFetchAnueNews: (depends: {}) => () => Promise<string> = () => {
  let cache = ''

  return async () => {
    if (cache) {
      return cache
    }

    const response = await fetch(
      'https://api.cnyes.com/media/api/v1/newslist/category/headline?limit=30&startAt=1611849600',
    )

    // save to db.

    const text = await response.text()

    cache = text

    return text
  }
}
