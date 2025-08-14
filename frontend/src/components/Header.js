import React from 'react'
import logo from '../assets/svgs/Logo.svg';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <img src={logo} alt=""/>
        <div className="header-buttons">
          <button className="button"
          onClick={() => {
            const element = document.querySelector('.get-request');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          >Users</button>
          <button className="button"
          onClick={() => {
            const element = document.querySelector('.post-request');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          >Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default Header