import { ItemThumbnail } from './index'

interface ItemSnippet {
  country: string,
  description: string,
  publishedAt: Date,
  title: string,
  thumbnails: ItemThumbnail[]
}

interface Item {
  id: string,
  snippet: ItemSnippet,
}

export type IChannel = {
  items: Item[]
}