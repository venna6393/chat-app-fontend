import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './header.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('user1')
    Cookies.remove('userId1')
    const {history} = props
    history.push('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <h1 className="website-logo"> chat-application</h1>
        </Link>
        <ul className="nav-menu">
          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
