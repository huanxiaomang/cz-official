import { defHttp } from '~/utils/http'

export interface WinnerMember {
  sortOrder: number
  user: {
    userId: number
    username: string
    email: string
    avatar: string
    major: string
    badge?: string | null
  } | null
}

export interface Winner {
  id: number
  title: string
  award: string
  category: 'COMPETITION' | 'SCHOLARSHIP' | 'HONOR'
  avatar: string
  members: WinnerMember[]
  createdAt: string
}

export interface CreateWinnerDto {
  title: string
  award: string
  category?: string
  avatar?: string
  memberIds?: number[]
}

export interface UpdateWinnerDto {
  title?: string
  award?: string
  category?: string
  avatar?: string
  memberIds?: number[]
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  title?: string
  award?: string
  category?: string
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
  titleStats: Array<{
    title: string
    _count: {
      title: number
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

export function getWinnersByTitle(title: string) {
  return defHttp.get<Winner[]>({
    url: '/winners/filter/title',
    params: { title }
  })
}

export function getWinnersStats() {
  return defHttp.get<WinnerStats>({
    url: '/winners/stats',
  })
}
