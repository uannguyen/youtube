import { Menu } from 'antd'
import { HomeOutlined, PlaySquareOutlined, ExportOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../stores/toolkit/hooks'

 const Sidebar = (props) => {

  const { toggleSidebar } = useAppSelector(state => state.toggle)
  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <div className='sidebar-container'>
      <div className={`${toggleSidebar}-sidebar`}>
      <Menu
          onClick={handleClick}
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
          <Menu.Item key="3" icon={<ExportOutlined />}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar