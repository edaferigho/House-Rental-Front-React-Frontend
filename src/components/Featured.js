import {React,useEffect,useState} from 'react'
import axios from 'axios'
import './Featured.css'
import Card from '../components/Card';
import Loader from './Loader'
// import properties from '../data'

// const url = "http://localhost:9000/api/vi/properties"
const url = "https://ict-yep.herokuapp.com/api/v1/properties"

function Featured({searchedProperties}) {
    const [properties, setProperties] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    console.log(searchedProperties)
    const getData = async() => {
        const response = await axios.get(url)
        
        console.log(response.data)
        if (response.data.data) {
            // console.log(response.data)
            setProperties(response.data.data)
            setIsLoading(false)
            // console.log(properties)
        }
        
    }
    
       
    
    useEffect(() => {
       getData ()
    },[])

    const addZero = (n) => {
        return n<10? `0${n}`:n
    }
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const showDate = (date) => {
        const today = new Date(date)
        const month = today.getMonth()
        const day = today.getDate()
        const year = today.getFullYear()
       return `${addZero(day)} ${monthNames[month]}, ${year}`
        
    }
    const displayProperties = properties.map((property) => {
        return <Card id={property._id} name={property.propertyType} city={property.city} image={property.propertyImages[0]} price={property.propertyPrice} date={showDate(property.addedDate)} />
    })

    return (
        <div className="featured">
            <div className="header">
                <h4>Featured Rentals</h4>
            </div>
            {isLoading&& <Loader />}
            <div className="featured-card">
                {displayProperties}
            </div>
            <div className="horzontal-line"></div>
            <div className="download-pointer">
                <img src="/assets/black-img.png" alt="" />
                <div className="download">
                    <h2>Download our Mobile Application for free</h2>
                    <div>
                        <img src="/assets/google-play.png" alt="google play" />
                        <img src="/assets/apple-store.png" alt="apple store" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
