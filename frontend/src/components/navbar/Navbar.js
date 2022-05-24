import React from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';

const Navbar = () => {
  return (
    <>
        <Nav>
            <NavLink to="/">
                <h1>Logo</h1>
            </NavLink>
            <NavMenu>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
            </NavMenu>
        </Nav>
    </>
  )
}

export default Navbar