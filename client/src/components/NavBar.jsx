import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect} from 'react'
import {GiBookAura } from 'react-icons/gi';


export default function NavBar() {

    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();


    async function sendEmailToBackend(first_name, last_name, email, auth0_sub) {

        const response = await fetch('/api/users', {
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
            
            <ul>
                <li>
                    <GiBookAura style= {{color: 'rgb(0,46,97)', marginLeft: 20}} size={48}/>
                </li>
                <li>
                    <Link to="/" className='home'> BookBites </Link>
                </li>
            </ul>

            <ul>
                <li>
                    <Link to='/about'> About </Link>
                </li>

                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/profile'> {user.given_name}'s Profile </Link>
                        </li>
                        <li>
                            <Link onClick={() => logout()}>Log Out</Link>
                        </li>
                    </>
                ) : (
                    <Link onClick={() => loginWithRedirect()}>
                        Log In
                    </Link>
                )}
                
            </ul>
        </nav>
    );
}


