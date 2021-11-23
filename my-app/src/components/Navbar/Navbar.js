import React, { Component } from 'react';
import './Navbar.css';
import { MenuItems } from './MenuItems';

class Navbar extends Component {
  render () {
    return(
      <nav className="NavbarItems">
        <h1 className="navbar-logo">FastStats</h1>
        <div className="menu-icons">

        </div>
        <ul>
          {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              )
          })}
        </ul>
      </nav>
    )
  }
}

export default Navbar;