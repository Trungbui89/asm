import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, Jumbotron, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {

    const [state, setState] = useState(false);

    function toggleNav() {
        setState(!state)
    }

    return (
        <React.Fragment>
            <Navbar dark expand='md'>
                <div className="container">
                    <NavbarBrand className='mr-auto' href="/">
                        <img src="assets/images/logo512.png" height='30px'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNav} />
                    <Collapse isOpen={state} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/staff'>
                                    <span className="fa fa-home fa-lg"></span> Nhân Viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/department'>
                                    <span className="fa fa-info fa-lg"></span> Phòng Ban
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/salary'>
                                    <span className="fa fa-list fa-lg"></span> Bảng Lương
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            {/* <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron> */}
        </React.Fragment>
    )
}

export default Header;