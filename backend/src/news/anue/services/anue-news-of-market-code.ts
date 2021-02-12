import { AnueNews } from '../model'
import { AnueNewsRepository } from '../repository'

export const makeAnueNewsOfMarketCode: (depends: {
  anueNewsRepository: AnueNewsRepository
}) => (codes: string[]) => Promise<AnueNews[]> = ({ anueNewsRepository }) => {
  return async codes => {
    const results = await anueNewsRepository.ofMarketCodes(codes)

    return results
  }
}
