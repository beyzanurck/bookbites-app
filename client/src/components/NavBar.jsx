import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import React from 'react'

export default function NavBar() {

    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    return (
        <nav className='navbar'>
            <Link to="/" className='home'> BookBites </Link>
            <ul>
                <li>
                    <Link to='/about'> About </Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/profile'> {user.email} </Link>
                        </li>
                        <li>
                            <button onClick={() => logout()}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <button onClick={() => loginWithRedirect()}>
                        Log In
                    </button>
                )}
            </ul>
        </nav>
    );
}


