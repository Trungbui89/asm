import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {

    const [state, setState] = useState(false);

    function toggleNav() {
        setState(!state)
    }

    return (
        <React.Fragment>
            <Navbar expand='md'>
                <div className="container">
                    <NavbarBrand className='mr-auto' href="/">
                        <img src="assets/images/logo512.png" alt="logo"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNav} />
                    <Collapse isOpen={state} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/staff'>
                                    <span className="fa fa-home fa-lg"></span>
                                    <p>NHÂN VIÊN</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/department'>
                                    <span className="fa fa-info fa-lg"></span> 
                                    <p>PHÒNG BAN</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/salary'>
                                    <span className="fa fa-list fa-lg"></span> 
                                    <p>BẢNG LƯƠNG</p>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;