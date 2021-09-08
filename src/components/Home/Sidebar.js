import { NavLink } from 'react-router-dom'

const Sidebar = (props) => {

  return (
    <div className='sidebar'>
      <div className='list-menu'>
      <NavLink exact to='/'  className='item' activeClassName="selected">Trang Chu</NavLink>
      <NavLink to='/kham-pha'  className='item' activeClassName="selected">Kham Pha</NavLink>
      <NavLink to='kenh-dang-ky'  className='item' activeClassName="selected">Kenh Dang Ky</NavLink>
      </div>
    </div>
  )
}

export default Sidebar