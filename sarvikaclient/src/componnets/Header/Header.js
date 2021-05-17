import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
} from './HeaderCss';

const Header = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to='/' activeStyle>
                        Home
          </NavLink>
                    <NavLink to='/allUser' activeStyle>
                        All User
          </NavLink>
                    <NavLink to='/addUser' activeStyle>
                        Add User
          </NavLink>


                </NavMenu>

            </Nav>
        </>
    );
};

export default Header;