import {React,useState,useEffect} from 'react'
//import {useState} from 'react'
import axios from 'axios'
import { GrLocation } from 'react-icons/gr'
import { ImPhone } from 'react-icons/im'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { BsFillBookmarkFill } from 'react-icons/bs'
import { FiMessageCircle } from 'react-icons/fi'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './Property.css'
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';

import Footer from '../components/Footer'




function Property() {
    const { id } = useParams()
    const [property, setProperty] = useState('')
    const [user, setUser] = useState('')
    const [showPhoneNumber,setShowPhoneNumber]= useState(false)
    console.log(id)

    const property_URL = `https://ict-yep.herokuapp.com/api/v1/properties/${id}`
    const getProperty = async () => {
        const response = await axios.get(property_URL)
        const userResponse = await axios.get(`https://ict-yep.herokuapp.com/api/v1/users/${response.data.property.userId}`)
        const propertyResponse = response.data
        const responseUser = userResponse.data
        console.log(propertyResponse)
        console.log(responseUser)
        if (propertyResponse.status === 'Success') {
            setProperty(propertyResponse.property)
            setUser(responseUser.user)
           
            console.log(property)
            console.log(user)
            
        }
        
       
    }
    
    useEffect(() => {
        getProperty()
        
    },[])
   //const [isShowMore,setIsShowMore] = useState(false)
    // const watsappLinker = (phoneNumber) => {
    //     window.location.href = `https://wa.me/${phoneNumber}`
    // }
    return (
        <div >
            <div className="property">
               
                <div className="head">
                    <p>{ property.propertyType}</p>
                    {property&&<p>{ `₦${property.propertyPrice}`}/Year</p>}
                </div>
                <p><span className="location"><GrLocation /></span>{ property.city}</p>
                <div className="property-agent">
                    {property && <img src={property.propertyImages[0]} alt="" />}
                    <div>
                    <div className="user-card">
                        <p id="mark"><BsFillBookmarkFill /></p>
                        <div >
                            <div className="user-details">
                        {user&&<img src='/assets/avatar.png' alt="" />}
                                    {user&&<p id="user-name">{`${user.firstName} ${user.lastName}`}</p>}
                                {user&&<p id="user-role">{user.userRole}</p>}
                                <div className="contact-agnt">
                                     <button onClick={()=>setShowPhoneNumber(true)}>{showPhoneNumber?user.phone:<span><ImPhone /> Phone</span>}</button>
                                    <button ><span><FiMessageCircle/></span> Message</button>
                                </div>
                       
                        </div>
                        </div>
                        
                    </div>
                  
                        </div>
                </div>
                <div className="img-group">
                    <Splide   options={ {
                        type   : 'loop',
                        perPage: 3,
                        perMove: 1,
                        gap: '2rem',
                        autoplay: true,
                        focus: 'center',
                        	breakpoints: {
		'640': {
			perPage: 2,
			gap    : '1rem',
		},
		'480': {
			perPage: 1,
            gap: '1rem',

                                },
        
                        }
                            
                    }}>
                        {property&& property.propertyImages.map((image) => {
                           return <SplideSlide>
                             {property&& <img src={image} alt="" />}
                        </SplideSlide>
                        })}
                        
                    </Splide>
                    
                </div>
                <div className="property-desc">
                    <p>General Information</p>
                    <div className="gen-description">
                        <h3>Description</h3>
                        <p>{ property.propertyDescription}</p>
                    </div>
                    {/* <div className="gen-description" >
                        <h3>The Neighborhood</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, dolorum ab ipsam quasi laborum maiores vitae blanditiis saepe quibusdam reprehenderit eligendi, doloribus consectetur repellendus exercitationem? Magnam dicta, reiciendis inventore, enim tempore nulla qui, dolore voluptate aliquid veritatis unde? Quam  dolore libero ex consequatur persplaflflas;farofsafklasflasfsalfalsfksdgasdgaiciatis maxime doloribus repellendus tempora aliquid obcaecati sit ducimus fuga vero, tempore eaque reprehenderit recusandae. Illo ullam deleniti necessitatibus repellendus laudantium dolorem incidunt.</p>

                    </div> */}
                </div>
                <div className="location-desc">
                    <p>Location Information</p>
                    <img src="/assets/map.jpg" alt="map" />
                </div>
           </div>
           
           <Footer /> 
        </div>
    )
}

export default Property
