import fetch from 'node-fetch'

// https://tw.news.yahoo.com/
export const makeFetchNews: (depends: {}) => () => Promise<string> = () => {
  return async () => {
    const response = await fetch('https://tw.news.yahoo.com')

    const text = await response.text()

    return text
  }
}
