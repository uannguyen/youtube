import { RequestProps, RequestParams } from "interface"
import config from './config'
export * from './auth'
const axios = require('axios')
const qs = require('qs')
const url = process.env.REACT_APP_ENDPOINT
const apiKey: string = config.apiKey
const accessToken = localStorage.getItem("access_token")

export const request = async ({ ENDPOINT, method, options }: RequestProps) => {
  try {
    const config = {
      headers: {},
      params: { key: "" },
      method,
      url: ENDPOINT,
      ...options
    }
    if (accessToken) config["headers"]["Authorization"] = `Bearer ${accessToken}`
    else config.params["key"] = apiKey

    const { data } = await axios(config)
    if (data) return data
    return null
  } catch (error: any) {
    console.log(error.message)
    return null
  }
}

export const search = async (reqParams: RequestParams) => {
  try {
    let params = {
      part: 'snippet',
      q: '',
      maxResults: 20,
      regionCode: 'VN',
      type: 'video',
      ...reqParams
    }
    let data: any = await request({
      ENDPOINT: url + 'search',
      method: 'get',
      options: { params, headers: {
        'Authorization': `Bearer ${accessToken}`
      } }
    })
    // Get Detail Video
    if (data && data.items.length) {
      data['items'] = data.items.filter((item: any) => item.snippet)
      const videoIds: any = []
      const channelIds: any = []

      data.items.forEach((i: any) => { if (i.id.videoId) videoIds.push(i.id.videoId) })

      // get detail video & channel thumbnail
      const promises = [getVideoByIds(videoIds)]
      if (params.q) {
        data.items.forEach((i: any) => { if (i.snippet.channelId) channelIds.push(i.snippet.channelId) })
        promises.push(getChannelByIds(channelIds))
      }

      const [videos = [], channels = []] = await Promise.all(promises)

      videos.forEach((video: any) => {
        let { id, contentDetails, statistics } = video

        let index = data.items.findIndex((i: any) => i.id.videoId === id)

        data.items[index] = {
          ...data.items[index],
          contentDetails, statistics
        }
      })
    }
    return data
  } catch (error: any) {
    console.log(error.message)
  }
}

export const list = async (reqParams: RequestParams) => {
  try {
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'chart': 'mostPopular',
      'regionCode': 'VN',
      'maxResults': 24,
      ...reqParams
    }
    const videos = await request({
      ENDPOINT: url + 'videos',
      method: 'get',
      options: { params }
    })
    if (!videos || !videos.items) return
    let channelIds = []
    channelIds = videos.items.map((i: any) => {
      return i.snippet.channelId
    })
    const channels = await getChannelByIds(channelIds)
    return { videos, channels }
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getVideoById = async (id: string) => {
  try {
    if (!id) return
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'id': id
    }
    const data: any = await request({
      ENDPOINT: url + 'videos',
      method: 'get',
      options: { params } 
    })
    if (data && data.items && data.items.length) {
      const { snippet }: any = data.items[0]
      const channels: any = await getChannelByIds([snippet?.channelId])
      return { video: data.items[0], channel: channels[0] }
    }
    return null
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getVideoByIds = async (ids = []) => {
  try {
    if (!ids.length) return
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'id': String(ids)
    }
    const data = await request({
      ENDPOINT: url + 'videos',
      method: 'get',
      options: { params }
    })
    if (data && data.items && data.items.length) return data.items
    return []
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getChannelByIds = async (ids: any) => {
  try {
    const params = {
      part: 'snippet',
      id: String(ids || [])
    }
    const data = await request({
      ENDPOINT: url + 'channels',
      method: 'get',
      options: { params }
    })
  
    if (!data) return
    return data.items
  } catch (error: any) {
    console.log('getChannelByIds', error.message)
  }
}

export const getVideoCategories = async () => {
  try {
    const result: any = []
    const q = {
      part: 'snippet',
      regionCode: 'VN',
      hl: 'vi'
    }
    const { data } = await request({
      ENDPOINT: url + 'videoCategories?' + qs.stringify(q),
      method: 'get'
    })
    if (data && data.items.length) {
      data.items.forEach((item: any) => {
        result.push({
          videoCategoryId: item.id,
          title: item.snippet.title
        })
      })
    }
    return result
  } catch (error: any) {
    console.log('getVideoCategories', error.message)
  }
}

export const listCommentByVideoId = async (reqParams: RequestParams) => {
  try {
    const params = {
      part: 'snippet',
      order: 'relevance',
      maxResults: 20,
      ...reqParams
    }
    const data = await request({
      ENDPOINT: url + 'commentThreads',
      method: 'get',
      options: { params }
    })
    if (data) return data
    return null
  } catch (error: any) {
    console.log('listCommentByVideoId', error.message)
    return null
  }
}

export const updateRate = async ({ rate, id }: RequestParams): Promise<void> => {
  try {
    if (!accessToken || !rate || !id) return
    await request({
      ENDPOINT: url + `videos/rate?id=${id}&rating=${rate}`,
      method: 'post',
    })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getRating = async (id: RequestParams): Promise<void> => {
  try {
    if (!accessToken || !id) return
    return await request({
      ENDPOINT: url + `videos/getRating?id=${id}`,
      method: 'get'
    })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const postComment = async ({ id, commentText }: RequestParams) => {
  try {
    const body = {
      snippet: {
        videoId: id,
        canReply: true,
        topLevelComment: {
          snippet: {
            textOriginal: commentText
          }
        }
      }
    }
    return await request({
      ENDPOINT: url + 'commentThreads',
      method: 'post',
      options: {
        params: { part: 'snippet' },
        data: body,
        headers: { 'Content-Type': 'application/json' }
      }
    })
  } catch (error) {
    
  }
}
