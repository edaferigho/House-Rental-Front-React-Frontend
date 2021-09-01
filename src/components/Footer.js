import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { IoIosCall } from 'react-icons/io'
import { GrFacebookOption } from 'react-icons/gr'
import { FiTwitter, FiInstagram } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'
import './Footer.css'

function Footer() {
    return (
    <div className="footer">
        <div className="footer-details">
            <div>
                <p className="footer-title">Navigation</p>
                <p>About</p>
                <p>For Rent</p>
                <p>Agents</p>
                
            </div>
            <div>
                <p className="footer-title">Contact Us</p>
                <p className="contact"><span><HiOutlineMail /></span>Infodhsr@example.com</p>
                <p className="contact" id="call"><span><IoIosCall /></span>+2347045679779</p> 
            </div>
            <div id="social">
                <p className="footer-title">Follow Us</p>
                <button className="social-icon"><GrFacebookOption/></button>
                <button className="social-icon"><FiTwitter/></button>
                <button className="social-icon red-icons"><FiInstagram /></button>
                <button className="social-icon red-icons"><FaYoutube/></button>
                
            </div>
             <div>
                <p className="footer-title">Our Apps</p>
                <img src="/assets/google-play.png" alt="" />
                <img src="/assets/apple-store.png" alt="" />
            
            </div>
             <div className="footer-title last">
                <p className="footer-title">Terms & Policies</p>
                <p>Privacy Policies</p>
                <p>Terms & Conditions</p>
                
                
                </div>
                
            </div>
            <p id="copyright">&copy;{ new Date().getFullYear()} dshr@example.com</p>
        </div>
    )
}

export default Footer
