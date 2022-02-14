import React, { useEffect, useState } from 'react';
import logo from 'images/icon-youtube.png'
import { Button, Input } from 'antd'
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from 'stores/toolkit/hooks'
import { handleToggleSidebar } from 'stores/toolkit/Slice/toggleSlice'
import { useHistory, useLocation } from 'react-router-dom'
import { getLoginUrl } from 'api'
import { useSearchQuery } from 'components/CustomHook'
import { decodeAuthToken } from 'utils'
import { getTokens, updateUser, handleAuth } from 'stores/toolkit/Slice/authSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const { isOpenSidebar } = useAppSelector(state => state.toggle)
  const { access_token, refresh_token, id_token, userInfo } = useAppSelector(state => state.auth)
  const history = useHistory()
  const location = useLocation()
  const code = useSearchQuery('code')
  const [searchText, setSearchText] = useState('')

  /*
    - Get id_token from localStorage
    - Decode token to JSON
    - Update user info
  */
  const updateUserInfo = (jwtToken: string | null) => {
    const idToken = jwtToken || localStorage.getItem('id_token') || ''
    const decodeValues = decodeAuthToken(idToken)
    if (decodeValues) dispatch(updateUser(decodeValues))
    return null
  }


  useEffect(() => {
    /*
      When redirect from LoginGoogle Form:
      - check code => redirect to the login event page
      - get token info
    */
    if (code) {
      const goBackUrl = localStorage.getItem('goBackUrl')
      if (goBackUrl) history.push(goBackUrl)
      dispatch(getTokens(code))
    }

    dispatch(handleAuth())

    updateUserInfo(null)
  }, [])

  /*
    When dependent variable change: 
      - Saved token
      - Update user info
  */
  useEffect(() => {
    if (access_token) localStorage.setItem('access_token', access_token)
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token)
    if (id_token) {
      localStorage.setItem('id_token', id_token)
      updateUserInfo(id_token)
    }
  }, [access_token, id_token])

  const handleClick = () => {
    const { pathname, search } = location
    localStorage.setItem('goBackUrl', pathname + search)
  }

  const handleSearch = () => {
    if (searchText) history.push(`/results?search_query=${searchText}`)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') handleSearch()
  }
  return (
    <div className='header-container'>
      <div className='header-left'>
        <MenuOutlined onClick={() => dispatch(handleToggleSidebar(!isOpenSidebar))} style={{ fontSize: 15 }} />
        <div onClick={() => history.push('/')} className='header-logo'>
          <img src={logo} alt='Logo' />
          <span>Youtube</span>
          <span className='region'>VN</span>
        </div>
      </div>
      <div className='search'>
        <Input
          value={searchText}
          placeholder="Tìm kiếm"
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={handleSearch}
          className='btn-search'
          icon={<SearchOutlined />}
          size="large"
        />
      </div>
      <div className='login'>
        {
          userInfo ? <div className='topbar-menu'>
            <img className='avatar-img' src={userInfo?.picture} alt='avatar' />
          </div>
            :
            <Button onClick={handleClick} href={getLoginUrl()} icon={<UserOutlined />} size="large">
              Login
            </Button>
        }
      </div>
    </div>
  )
}

export default Header