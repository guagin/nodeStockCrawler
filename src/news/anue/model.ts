export interface Market {
  code: string
  name: string
  symbol: string
}

export interface AnueNewProps {
  id: string
  publishedAt: Date
  title: string
  content: string
  markets: Market[]
}

export interface AnueNews {
  id: string
  publishedAt: Date
  title: string
  content: string
  markets: Market[]
}

export const makeAnueNews: (props: AnueNewProps) => AnueNews = props => {
  return {
    get id() {
      return props.id
    },
    get publishedAt() {
      return props.publishedAt
    },
    get title() {
      return props.title
    },
    get content() {
      return props.content
    },
    get markets() {
      return props.markets
    },
  }
}

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

export interface AnueNewsFetchLogProps {
  id: string
  items: FetchedContent
}

export interface AnueNewsFetchLog {
  id: string
  items: FetchedContent
}

export const makeAnueNewsFetchLog: (props: AnueNewsFetchLogProps) => AnueNewsFetchLog = props => {
  return {
    get id() {
      return props.id
    },

    get items() {
      return props.items
    },
  }
}
