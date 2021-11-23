import React, { Components } from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './Navbarelements';

const Navbar = () => {
    return (
      <>
        <Nav>
          <Bars />
    
          <NavMenu>
            <NavLink to='/compare' activeStyle>
              Compare
            </NavLink>
            <NavLink to='/performance' activeStyle>
              Perfomance
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>

        </Nav>
      </>
    );
  };

export default Navbar;