import React, { useEffect, useState } from 'react';
import logo from '../../images/icon-youtube.png'
import { Button, Input } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../stores/toolkit/hooks'
import { auth } from '../../stores/toolkit/authSlice'
import TopbarMenu from './TopbarMenu';

const Header = (props) => {
  const dispatch = useAppDispatch()
  const { credential: { accessToken }, user } = useAppSelector(state => state.app)
  const [userInfo, setUserInfo] = useState(null)
  const [token, setToken] = useState(null)
  const [visible, setVisible] = useState(false)

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
    setVisible(false)
  }

  const handleShowMenu = () => setVisible(true)

  return (
    <div className='header-container'>
      {console.log('3333333333333333', token)}
      <div className='logo'>
        <img src={logo} alt='Logo' />
        <span>Youtube</span>
      </div>
      <div className='search'>
        <Input placeholder="input search text" />
        <Button className='btn-search' icon={<SearchOutlined />} size="large" />
      </div>
      <div className='login'>
        {
          token ? <div onClick={handleShowMenu} className='topbar-menu'>
            <img className='avatar-img' src={userInfo.picture} alt='avatar' />
          </div>
            :
            <Button onClick={handleLogin} icon={<UserOutlined />} size="large">Login</Button>
        }
      </div>
      <TopbarMenu visible={visible} setVisible={setVisible} userInfo={userInfo}
        handleLogout={handleLogout}
      />
    </div>
  )
}

export default Header