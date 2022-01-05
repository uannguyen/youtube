const axios = require('axios')
const qs = require('qs')
const { request } = require('./api')
const ENDPOINT = 'https://oauth2.googleapis.com/'

const { 
  REACT_APP_ACCESS_TYPE,
  REACT_APP_RESPONSE_TYPE,
  REACT_APP_REDIRECT_URL,
  REACT_APP_USER_SCOPE,
  REACT_APP_YOUTUBE_SCOPE,
  REACT_APP_STATE,
  REACT_APP_API_KEY,
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET
} = process.env


const getLoginUrl = ({ type = 'user' }) => {
  let params = {
    redirect_uri: REACT_APP_REDIRECT_URL,
    response_type: REACT_APP_RESPONSE_TYPE,
    client_id: REACT_APP_CLIENT_ID,
    scope: REACT_APP_USER_SCOPE,
    access_type: REACT_APP_ACCESS_TYPE
  }
  if (type === 'youtube') params = { 
    ...params,
    include_granted_scopes: true,
    state: REACT_APP_STATE
   }
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?'
  return url + qs.stringify(params)
}

const getUserInfo = async (access_token) => {
  try {
    if (!access_token) return
    const data = await request(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      "get",
      { params: { access_token } }
    )
    return data
  } catch (error) {
    console.log('getUserInfo', error.message)
    return
  }
}

const getAccessToken = async (code) => {
  try {
    if (!code) return
    const body = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REACT_APP_REDIRECT_URL,
      code
    }
    const data = await request(ENDPOINT + 'token', 'post', {
      data: qs.stringify(body),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch (error) {
    console.log('getAccessToken', error.message)
    return
  }
}

const refreshToken = async (refresh_token) => {
  try {
    if (!refresh_token) return
    const body = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token
    }
    const data = await request(ENDPOINT + 'token', 'post', {
      data: qs.stringify(body),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch (error) {
    console.log('refreshToken', error.message)
    return
  }
}

module.exports = {
  getLoginUrl,
  getUserInfo,
  getAccessToken,
  refreshToken
}