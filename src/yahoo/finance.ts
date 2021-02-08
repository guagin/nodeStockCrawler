import fetch from 'node-fetch'
import cheerio from 'cheerio'

export const makeFetchNews: (depends: {}) => () => Promise<string> = () => {
  let cache = ''

  return async () => {
    if (cache) {
      return cache
    }

    const response = await fetch('https://tw.news.yahoo.com/finance')

    const text = await response.text()

    cache = text

    return text
  }
}
