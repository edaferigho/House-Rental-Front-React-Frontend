import React from 'react'
import {FaRegEdit} from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GrLocation } from 'react-icons/gr'
import './ProfileCard.css'
function ProfileCard({id,name,city,image,price}) {
    return (
        <div className="card">
            <img src={image} alt="" />
            <div>
                <h3 className="title">{ name}</h3>
                <div className="card-details"><span><GrLocation /></span>
                    <p className="location">{ city}</p>
                    <div className="vert-line"></div>
                    <p className="price">{ price}</p>
                </div>
                <div id="baseline"></div>
                <div className="engage-bar">
                    <span><FaRegEdit /></span>
                    <span><RiDeleteBinLine /></span>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
