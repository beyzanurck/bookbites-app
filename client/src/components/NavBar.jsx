import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {useEffect, useState} from 'react'

export default function NavBar() {

    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    // const [userInfo, setUserInfo] = useState([])

    // async function getUserById() {
    //     try {

    //         const response = await fetch(`http://localhost:1212/users?user_sub=${user.sub}`);

    //         const theUser = await response.json()

    //         setUserInfo(theUser)

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    async function sendEmailToBackend(first_name, last_name, email, auth0_sub) {

        const response = await fetch('http://localhost:1212/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name, last_name, email, auth0_sub })
        });
    
        return await response.json();
    }

    async function sendEmail() {

        if (isAuthenticated && user && user.email) {
            try {

                const response = await sendEmailToBackend(user.given_name, user.family_name, user.email, user.sub);

                if (response.status === "user_exists") {
                    console.log(response.message); 
                } else {
                    console.log('Email sent to backend successfully and user added.');
                }

            } catch (error) {
                console.error('Error sending email to backend:', error);
            }
        }
    }

    useEffect(() => {
        sendEmail();
    }, [isAuthenticated, user]);

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


