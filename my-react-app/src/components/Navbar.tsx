import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import './style.components/navbar.css'

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(false)

  const openSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className="menu-bars">
          <Link to="#" onClick={openSidebar}>
            <div onClick={openSidebar}>
              <i className="bx bx-menu" id="btn" onClick={openSidebar}></i>
            </div>
          </Link>
          <div className="logo_name" onClick={openSidebar}>
            CanaisPEC
          </div>
        </div>
        <ul className="nav-menu-items">
          {Sidebar.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="links_name">{item.title}</span>
                  <span>{item.tName}</span>
                </Link>
              </li>
            )
          })}
          <li className="profile">
            <div className="profile-details">
              <img src="5359553_960_720" alt="img user" />
              <div className="name_job">
                <div className="name">Usuario</div>
                <div className="job">Função</div>
              </div>
            </div>
            
              <a href="http://polireal.azurewebsites.net/Login.aspx"><i className="bx bx-log-out" id="log_out"></i></a>
            
          </li>
        </ul>
      </nav>
    </>
  )
}
