

export type IComment = {
  id: string,
  snippet: ISnippet
}

type ISnippet = {
  videoId: string
  topLevelComment: ITopLevelComment
  canReply: string
  totalReplyCount: number
  isPublic: string
}

type ITopLevelComment = {
  id: string,
  snippet: {
    videoId: string
    textDisplay: string
    textOriginal: string
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: {
      value: string
    }
    canRate: boolean
    viewerRating: string
    likeCount: number
    publishedAt: string
    updatedAt: string
  }
}