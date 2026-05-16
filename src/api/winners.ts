import { defHttp } from '~/utils/http'

export interface Winner {
  id: number
  name: string
  competition: string
  award: string
  avatar: string
  createdAt: string
}

export interface CreateWinnerDto {
  name: string
  competition: string
  award: string
  avatar?: string
}

export interface UpdateWinnerDto {
  name?: string
  competition?: string
  award?: string
  avatar?: string
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  name?: string
  competition?: string
  award?: string
}

export interface PaginationResult<T> {
  winners: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface WinnerStats {
  totalWinners: number
  awardStats: Array<{
    award: string
    _count: {
      award: number
    }
  }>
  competitionStats: Array<{
    competition: string
    _count: {
      competition: number
    }
  }>
}

export interface BatchResult {
  count: number
  message: string
}

export function getWinners() {
  return defHttp.get<Winner[]>({
    url: '/winners',
  })
}

export function getWinnersWithPagination(params: PaginationParams) {
  return defHttp.get<PaginationResult<Winner>>({
    url: '/winners/page',
    params
  })
}

export function getWinnerById(id: number) {
  return defHttp.get<Winner>({
    url: `/winners/${id}`,
  })
}

export function createWinner(data: CreateWinnerDto) {
  return defHttp.post<Winner>({
    url: '/winners',
    data
  })
}

export function batchCreateWinners(data: CreateWinnerDto[]) {
  return defHttp.post<BatchResult>({
    url: '/winners/batch',
    data
  })
}

export function updateWinner(id: number, data: UpdateWinnerDto) {
  return defHttp.put<Winner>({
    url: `/winners/${id}`,
    data
  })
}

export function deleteWinner(id: number) {
  return defHttp.delete<null>({
    url: `/winners/${id}`,
  })
}

export function batchDeleteWinners(ids: number[]) {
  return defHttp.delete<BatchResult>({
    url: '/winners/batch',
    data: { ids }
  })
}

export function getWinnersByAward(award: string) {
  return defHttp.get<Winner[]>({
    url: '/winners/filter/award',
    params: { award }
  })
}

export function getWinnersByCompetition(competition: string) {
  return defHttp.get<Winner[]>({
    url: '/winners/filter/competition',
    params: { competition }
  })
}

export function getWinnersStats() {
  return defHttp.get<WinnerStats>({
    url: '/winners/stats',
  })
}
