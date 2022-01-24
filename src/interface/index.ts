export * from 'interface/api'
export * from 'interface/channel'
export * from 'interface/comment'
export * from 'interface/user'
export interface IOption {
  action: string
  part?: string,
  q?: string,
  maxResults?: number,
  regionCode?: string,
  chart?: string,
  nextPageToken?: string
}

interface ItemThumbnailDetail {
  height: number,
  url: string,
  width: number
}

export interface ItemThumbnail {
  default?: ItemThumbnailDetail,
  high?: ItemThumbnailDetail,
  maxres?: ItemThumbnailDetail,
  medium?: ItemThumbnailDetail,
  standard?: ItemThumbnailDetail
}

interface ItemSnippet {
  title: string,
  categoryId: string,
  channelId: string,
  channelTitle: string,
  description: string,
  publishedAt: Date,
  tags: string[],
  thumbnails: ItemThumbnail
}

interface ItemStatistics {
  commentCount: string,
  dislikeCount: string,
  favoriteCount: string,
  likeCount: string,
  viewCount: string
}

export interface VideoItem {
  id: string | { videoId: string } | any,
  snippet: ItemSnippet,
  statistics?: ItemStatistics | any,
  contentDetails?: { duration: string } | any
}

export type IVideo = {
  pageToken?: string,
  items: VideoItem[]
}

