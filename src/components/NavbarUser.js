import { React } from 'react'
import { FaUser } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './NavbarUser.css'


function NavbarUser() {
    return (
        <div className="navbar_user">
            <Link to="/">
                <div className="logo">
                <img src="/assets/Vector.png" alt="" />
                <img src="/assets/dshr..png" alt="" />
            </div>
            </Link>
            <div className="search_profile">
                <input type="text" placeholder="Search" />
                <span id="search_logo"><FiSearch /></span>
                <span id="profile_avatar"><FaUser/></span> 
            </div>
               
           </div>
            
    )
}

export default NavbarUser
