import { AnueNews, AnueNewsFetchLog } from './model'

export interface AnueNewsRepository {
  ofDateRange(input: {
    startAt: Date
    endAt: Date
    count: number
    page: number
  }): Promise<{
    totalCount: number
    totalPages: number
    data: AnueNews[]
    page: number
  }>

  ofMarketCodes(codes: string[]): Promise<AnueNews[]>
  save(anueNews: AnueNews): Promise<void>
  saveMany(anueNews: AnueNews[]): Promise<void>
}

export interface AnueNewsFetchLogRepository {
  ofId(id: string): Promise<AnueNewsFetchLog | null>
  save(anueNewsFetchLog: AnueNewsFetchLog): Promise<void>
}
