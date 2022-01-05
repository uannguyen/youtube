import { Menu } from 'antd'
import { HomeOutlined, PlaySquareOutlined, ExportOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from 'stores/toolkit/hooks'
import { updateUser } from 'stores/toolkit/Slice/userSlice'

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(state => state.user)
  const { toggleSidebar } = useAppSelector(state => state.toggle)

  const handleLogout = () => {
    dispatch(updateUser(null))
    localStorage.setItem('userInfo', '')
  }

  return (
    <div className='sidebar-container'>
      <div className={`${toggleSidebar}-sidebar`}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Trang chủ
          </Menu.Item>
          <Menu.Item key="2" icon={<PlaySquareOutlined />}>
            Kênh đăng ký
          </Menu.Item>
          {
            userInfo && <Menu.Item onClick={handleLogout} key="3" icon={<ExportOutlined />}>
              Đăng xuất
            </Menu.Item>
          }
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar