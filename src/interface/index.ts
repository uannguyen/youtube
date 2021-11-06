

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

interface Item {
  id: string,
  snippet: ItemSnippet,
  statistics?: ItemStatistics,
  contentDetails?: {
    duration: string
  }
}

export type IVideo = {
  pageToken?: string,
  items: Item[]
}

