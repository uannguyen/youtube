const axios = require('axios')
const qs = require('qs')
const delay = require('delay')
const url = process.env.REACT_APP_ENDPOINT
const apiKey = process.env.REACT_APP_API_KEY

const request = async (ENDPOINT, method, options) => {
  try {
    const config = {
      method,
      url: ENDPOINT,
      ...options
    }
    const { data } = await axios(config)
    if (data) return data
    return null
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const search = async (options) => {
  try {
    let params = {
      part: 'snippet',
      q: '',
      maxResults: 20,
      regionCode: 'VN',
      type: 'video',
      key: apiKey,
      ...options
    }
    let data = await request(url + 'search', 'get', { params })
    // Get Detail Video
    if (data && data.items.length) {
      data['items'] = data.items.filter(item => item.snippet)
      const videoIds = []
      const channelIds = []

      data.items.forEach(i => { if (i.id.videoId) videoIds.push(i.id.videoId) })

      // get detail video & channel thumbnail
      const promises = [getVideoByIds(videoIds)]
      if (params.q) {
        data.items.forEach(i => { if (i.snippet.channelId) channelIds.push(i.snippet.channelId) })
        promises.push(getChannelByIds(channelIds))
      }

      const [videos = [], channels = []] = await Promise.all(promises)

      videos.forEach(video => {
        let { id, contentDetails, statistics } = video

        let index = data.items.findIndex(i => i.id.videoId === id)

        data.items[index] = {
          ...data.items[index],
          contentDetails, statistics
        }
      })
    }
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const list = async (queries) => {
  try {
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'chart': 'mostPopular',
      'regionCode': 'VN',
      'key': apiKey,
      'maxResults': 24,
      ...queries
    }
    const videos = await request(url + 'videos', 'get', { params })
    if (!videos || !videos.items) return
    let channelIds = []
    channelIds = videos.items.map(i => {
      return i.snippet.channelId
    })
    const channels = await getChannelByIds(channelIds)
    return { videos, channels }
  } catch (error) {
    console.log(error.message)
  }
}

export const getVideoById = async (id) => {
  try {
    if (!id) return
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'key': apiKey,
      'id': id
    }
    const data = await request(url + 'videos', 'get', { params })
    if (data && data.items && data.items.length) {
      const { snippet } = data.items[0]
      const channels = await getChannelByIds([snippet.channelId])
      return { video: data.items[0], channel: channels[0] }
    }
    return null
  } catch (error) {
    console.log(error.message)
  }
}

export const getVideoByIds = async (ids = []) => {
  try {
    if (!ids.length) return
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'key': apiKey,
      'id': String(ids)
    }
    const data = await request(url + 'videos', 'get', { params })
    if (data && data.items && data.items.length) return data.items
    return []
  } catch (error) {
    console.log(error.message)
  }
}

export const getChannelByIds = async (ids = []) => {
  try {
    const params = {
      part: 'snippet',
      key: apiKey,
      id: String(ids)
    }
    const data = await request(url + 'channels', 'get', {
      params
    })
    if (!data) return
    return data.items
  } catch (error) {
    console.log('getChannelByIds', error.message)
  }
}

export const getVideoCategories = async () => {
  try {
    const result = []
    const q = {
      part: 'snippet',
      regionCode: 'VN',
      key: apiKey,
      hl: 'vi'
    }
    const { data } = await axios.get(url + 'videoCategories?' + qs.stringify(q))
    if (data && data.items.length) {
      data.items.forEach(item => {
        result.push({
          videoCategoryId: item.id,
          title: item.snippet.title
        })
      })
    }
    return result
  } catch (error) {
    console.log('getVideoCategories', error.message)
  }
}

export const listCommentByVideoId = async (options) => {
  try {
    const params = {
      part: 'snippet',
      order: 'relevance',
      key: apiKey,
      maxResults: 20,
      ...options
    }
    const data = await request(url + 'commentThreads', 'GET', { params })
    if (data) return data
    return null
  } catch (error) {
    console.log('listCommentByVideoId', error.message)
    return null
  }
}
