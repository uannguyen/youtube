import React, { useEffect, useState } from 'react';
import logo from '../../images/icon-youtube.png'
import { Button, Input } from 'antd'
import { MenuOutlined, MoreOutlined, NotificationOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../stores/toolkit/hooks'
import { auth } from '../../stores/toolkit/Slice/authSlice'
import { handleToggleSidebar } from '../../stores/toolkit/Slice/toggleSlice'
import { useHistory } from 'react-router-dom'
const Header = () => {
  const dispatch = useAppDispatch()
  const { credential: { accessToken }, user } = useAppSelector(state => state.app)
  const [userInfo, setUserInfo] = useState(null)
  const [token, setToken] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if (accessToken) localStorage.setItem('accessToken', accessToken)
    if (user) localStorage.setItem('user', JSON.stringify(user))
    const userInfo = localStorage.getItem('user')
    const authToken = localStorage.getItem('accessToken')
    setToken(authToken)
    setUserInfo(JSON.parse(userInfo))
  }, [accessToken, user])


  const handleLogin = () => dispatch(auth('login'))

  const handleLogout = () => {
    dispatch(auth('logout'))
    localStorage.clear()
  }

  return (
    <div className='header-container'>
      <div onClick={() => history.push('/')} className='logo'>
        <MenuOutlined onClick={() => dispatch(handleToggleSidebar())} style={{ fontSize: 15 }} />
        <img src={logo} alt='Logo' />
        <span>Youtube</span>
        <span className='region'>VN</span>
      </div>
      <div className='search'>
        <Input placeholder="input search text" />
        <Button className='btn-search' icon={<SearchOutlined />} size="large" />
      </div>
      <div className='login'>
        {
          token ? <div className='topbar-menu'>
            <img className='avatar-img' src={userInfo.picture} alt='avatar' />
          </div>
            :
            <Button onClick={handleLogin} icon={<UserOutlined />} size="large">Login</Button>
        }
      </div>
    </div>
  )
}

export default Header