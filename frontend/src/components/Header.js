import React from 'react'
import logo from '../assets/Logo.svg'
function Header() {
  return (
    <div className="Header">
      <div className="Header-container">
        <img src={logo} alt=""/>
        <div className="header-buttons">
          <button className="button">Users</button>
          <button className="button">Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default Header