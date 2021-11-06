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

const search = async (queries) => {
  try {
    const { q = '', limit = 20, type = 'video', pageToken } = queries
    let params = {
      part: 'snippet',
      q,
      key: apiKey,
      maxResults: limit,
      regionCode: 'VN',
      pageToken
    }
    let data = await request(url + 'search', 'get', { params })

    // Get Detail Video

    if (data && data.items.length) {
      const videoPromises = []

      data.items.forEach(i => {
        videoPromises.push(getVideoById(i.id.videoId))
      })

      console.log('data.items', data.items[0])
      let videos = await Promise.all(videoPromises)

      videos.forEach(video => {
        let { id, contentDetails, statistics, snippet } = video.items[0]

        let index = data.items.findIndex(i => i.id.videoId === id)

        data.items[index] = {
          ...data.items[index],
          contentDetails, statistics, snippet
        }
      })
    }
    console.log('videos', data)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

const list = async (queries) => {
  try {
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'chart': 'mostPopular',
      'regionCode': 'VN',
      'key': apiKey,
      'maxResults': 30,
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

const getVideoById = async (id) => {
  try {
    if (!id) return
    const params = {
      'part': 'snippet,contentDetails,statistics',
      'key': apiKey,
      'id': id
    }
    const data = await request(url + 'videos', 'get', { params })
    if (data && data.items && data.items.length) return data.items[0]
    return null
  } catch (error) {
    console.log('getVideoById', error)
  }
}

const getChannelByIds = async (ids = []) => {
  try {
    let params = `part=snippet&key=${apiKey}&id=${ids[0]}`
    if (ids.length) { ids.forEach(i => params = params.concat(`&id=${i}`)) }
    const data = await request(url + `channels?${params}`, 'get')
    console.log('channelssssss', data)
    if (!data) return
    return data.items
  } catch (error) {
    console.log('getChannelByIds', error)
  }
}

const getVideoCategories = async () => {
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

const listCommentByVideoId = async (options) => {
  try {
    const params = {
      part: 'snippet',
      order: 'relevance',
      key: apiKey,
      ...options
    }
    const data = await request(url + 'commentThreads', 'GET', { params })
    console.log('listCommentByVideoId', data, params)
    if (data) return data
    return null
  } catch (error) {
    console.log('listCommentByVideoId', error.message)
    return null
  }
}

module.exports = {
  search,
  list,
  getVideoCategories,
  getChannelByIds,
  getVideoById,
  listCommentByVideoId
}