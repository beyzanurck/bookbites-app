import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <nav className='navbar'>
            <Link to="/" className='home'> BootBites </Link>
            <ul>
                <li>
                <Link to='/profile'> Profile </Link>
                </li>
                <li>
                <Link to='/about'> About </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
