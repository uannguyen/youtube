import qs from 'qs'
import { request } from 'api'
import config from 'api/config'
import axios from 'axios'
const ENDPOINT = 'https://oauth2.googleapis.com/'

export const getLoginUrl = () => {
  let params: any = {
    redirect_uri: config.redirectUrl,
    response_type: config.responseType,
    client_id: config.clientId,
    scope: `${config.userScope} ${config.youtubeScope}`,
    access_type: config.accessType,
    include_granted_scopes: true,
    state: config.state,
    prompt: 'consent'
  }
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?'
  return url + qs.stringify(params)
}

export const getUserInfo = async (access_token: string) => {
  try {
    if (!access_token) return
    const data = await request({
      ENDPOINT: "https://www.googleapis.com/oauth2/v1/userinfo",
      method: "get",
      options: { params: { access_token } }
    })
    return data
  } catch (error: any) {
    console.log('getUserInfo', error.message)
    return
  }
}

export const getAccessToken = async (code: string) => {
  try {
    if (!code) return
    const body = {
      client_id: config.clientId,
      client_secret: config.clientSecset,
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUrl,
      code,
      access_type: 'offline'
    }
    const data = await request({
      ENDPOINT: ENDPOINT + 'token',
      method: 'post',
      options: {
        data: qs.stringify(body),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    })
    return data
  } catch (error: any) {
    console.log('getAccessToken', error.message)
    return
  }
}

export const handleRefreshToken = async (refreshToken: string) => {
  try {
    if (!refreshToken) return
    const body = {
      client_id: config.clientId,
      client_secret: config.clientSecset,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
    const data = await request({
      ENDPOINT: ENDPOINT + 'token',
      method: 'post',
      options: {
        data: qs.stringify(body),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    })
    return data
  } catch (error: any) {
    console.log('refreshToken', error.message)
    return
  }
}

export const isExpiredAccessToken = async (accessToken: string) => {
  try {
    return await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
  } catch (error) {
    return null
  }
}