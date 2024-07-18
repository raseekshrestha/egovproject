import React, { useEffect } from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom'
import { authState } from '../context/AuthContext';
import LoginComponent from './LoginComponent';


const CustomNavbar = () => {
    const { isLoggedIn, user, logout } = authState();

    const location = useLocation();
    return (
        <Navbar fluid rounded className='bg-slate-300'>
            <Navbar.Brand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NRLCMS</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {!isLoggedIn ?
                    < LoginComponent /> :

                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={user.profilePic} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.username}</span>
                        </Dropdown.Header>

                        <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
                    </Dropdown>
                }

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link as={Link} to="/" active={location.pathname == "/"}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} to="/about" active={location.pathname == "/about"}>About</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar