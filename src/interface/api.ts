export interface RequestProps {
  ENDPOINT: string
  method: string
  options?: IOptions
}

export type IOptions = {
  params?: RequestParams
  data?: RequestBody | string | any
  headers?: any
}

export interface RequestParams {
  access_token?: string
  part?: string
  q?: string
  maxResults?: number
  regionCode?: string
  type?: string
  key?: string
  chart?: string
  id?: string
  hl?: 'vn' | string
  order?: 'relevance' | 'time' | string
  pageToken?: string
  rate?: 'like' | 'dislike' | 'none'
  commentText?: string
}

export type RequestBody = {
  client_id: string
  client_secret: string
  grant_type?: string
  refresh_token?: string
  redirect_uri?: string
  code?: string
}
