export interface AnueNewsRepository {
  ofDateRange(): Promise<AnueNews>
  save(): Promise<void>
}
