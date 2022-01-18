import React, { useEffect, useState } from 'react';
import logo from 'images/icon-youtube.png'
import { Button, Input } from 'antd'
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from 'stores/toolkit/hooks'
import { handleToggleSidebar } from 'stores/toolkit/Slice/toggleSlice'
import { useHistory, useLocation } from 'react-router-dom'
import { handleAuth } from 'stores/toolkit/Slice/authSlice'
import { getLoginUrl } from 'api/auth'
import { searchQuery } from 'utils/index'
import { fetchUser, updateUser } from 'stores/toolkit/Slice/userSlice'

const Header = () => {
  const dispatch = useAppDispatch()
  const { access_token, refresh_token } = useAppSelector(state => state.auth)
  const { userInfo } = useAppSelector(state => state.user)
  const history = useHistory()
  const location = useLocation()
  const search = searchQuery(location)

  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const code = search.get('code')
    if (code) {
      const goBackUrl = localStorage.getItem('goBackUrl')
      if (goBackUrl) history.push(goBackUrl)
      dispatch(handleAuth(code))
    }
  }, [])

  useEffect(() => {
    if (access_token) {
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      dispatch(fetchUser(access_token))
    }
  }, [access_token])

  useEffect(() => {
    const _userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null')
    if (_userInfo && !userInfo) dispatch(updateUser(_userInfo))
    if (userInfo && !_userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }, [userInfo])

  const handleClick = () => {
    const { pathname, search } = location
    localStorage.setItem('goBackUrl', pathname + search)
  }

  const handleSearch = () => { if (searchText) history.push(`/youtube/results?search_query=${searchText}`) }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className='header-container'>
      <div className='header-left'>
        <MenuOutlined onClick={() => dispatch(handleToggleSidebar())} style={{ fontSize: 15 }} />
        <div onClick={() => history.push('/')} className='header-logo'>
          <img src={logo} alt='Logo' />
          <span>Youtube</span>
          <span className='region'>VN</span>
        </div>
      </div>
      <div className='search'>
        <Input
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
        {console.log('userInfo', userInfo)}
        {
          userInfo ? <div className='topbar-menu'>
            <img className='avatar-img' src={userInfo?.picture} alt='avatar' />
          </div>
            :
            <Button onClick={handleClick} href={getLoginUrl({ type: 'user' })} icon={<UserOutlined />} size="large">
              Login
            </Button>
        }
      </div>
    </div>
  )
}

export default Header