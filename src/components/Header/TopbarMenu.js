import { Button, Drawer } from 'antd'

const TopbarMenu = (props) => {
  const { visible, setVisible, userInfo, handleLogout } = props
  return (
      <Drawer
      className='drawer-topbar-menu'
      closable={false}
      placement="right"
      onClose={() => setVisible(false)} visible={visible}>
        <div className='topbar-menu-content'>
          <div className='topbar-menu-info'>
            <img className='avatar-img' src={(userInfo && userInfo.picture) || ''} alt='avatar' />
            <span>{userInfo && userInfo.name}</span>
          </div>
          <div className='topbar-menu-option'>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </Drawer>
  )
}

export default TopbarMenu