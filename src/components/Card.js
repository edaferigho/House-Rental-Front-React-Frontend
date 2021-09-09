import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css';
import { GrLocation } from 'react-icons/gr'
import {FaHeart} from 'react-icons/fa'
import {FiShare2} from 'react-icons/fi'
//import reactRouterDom from 'react-router-dom';


function Card({name,image,price,city,id,date}) {
    return (
        <div className="card">
            <img src={image} alt="" />
            <div>
                <h3 className="title">{name}</h3>
                <p id="date">Posted on <span>{ date}</span> </p>
                <div className="card-details"><span><GrLocation /></span>
                    <p className="location">{city}</p>
                    <div className="vert-line"></div>
                    <p className="price">₦{ price}</p>
                </div>
                <div className="engage-bar">
                    <span><FaHeart /></span>
                    <span><FiShare2 /></span>
                    <Link id="link" to={`/properties/${id}`} ><button>View</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Card
