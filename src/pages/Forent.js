
import {React,useState, useEffect} from 'react'
import { FiSearch } from 'react-icons/fi'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import axios from 'axios'
import Loader from '../components/Loader'
import './Forent.css';
import ReactPagenate from 'react-paginate'
//import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
//import properties from '../data'
import Card from '../components/Card'
function Forent() {
    const [properties, setProperties] = useState([]);
    const [propertyType, setPropertyType] = useState('')
    const [city, setCity] = useState('')
    const [noOfBedRooms,setNoOfBedrooms] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const url = "https://ict-yep.herokuapp.com/api/v1/properties";
    const [isLoading,setIsLoading] = useState(true)

    const search = () => {
        axios.get(url, {data:{filterData:{ propertyType, city, noOfBedRooms, maxPrice }}}).then((response) => {
        if (response.data.data) {
    console.log(response)
    setProperties(response.data.data)
    setIsLoading(false)
}
    });
    }
useEffect(() => {
    search()
  },[url]);
    // const addZero = (n) => {
    //     return n<10? `0${n}`:n;
    // }
    //const [property,setproperty] = useState(properties.slice(0, 100))
    const [pageNumber, setPageNumber] = useState(0)
    const propertyPerPage = 16;
    const pagesVisited = pageNumber * propertyPerPage;
    const addZero = (n) => {
        return n<10? `0${n}`:n;
    }
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const showDate = (date) => {
        const today = new Date(date)
        const month = today.getMonth()
        const day = today.getDate()
        const year = today.getFullYear()
       return `${addZero(day)} ${monthNames[month]}, ${year}`
    }

    const displayProperties = properties.slice(pagesVisited, pagesVisited + propertyPerPage).map((property) => {
        return <Card id={property._id} name={property.propertyType} city={property.city} 
        image={property.propertyImages[0]} price={property.propertyPrice } date={showDate(property.addedDate)} />
    })
    const pageCount = Math.ceil(properties.length / propertyPerPage)


    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    return (
        <div>
        
            <div className="forRent">
                <div className="search-bar">
                    <select name="" id="" onChange={(e)=>setPropertyType(e.target.value)}>
                        <option value="" >Property Type</option>
                        <option value="Bungalow" >Bungalow</option>
                        <option value="Semi-Detached Duplex" >Semi-Detached Duplex</option>
                    </select>
                     <select name="" id="" onChange={(e)=>setCity(e.target.value)}>
                        <option value="">Location</option>
                        <option value="Ughelli">Ughelli</option>
                        <option value="Asaba">Asaba</option>
                    </select>
                     <select name="" id="" onChange={(e)=>setNoOfBedrooms(e.target.value)}>
                        <option value="">No. of Bedrooms</option>
                    </select>
                     <select name="" id="" onChange={(e)=>setMaxPrice(e.target.value)}>
                        <option value="">Amount Range</option>
                        <option value="40000">40000</option>
                        <option value="800000">800000</option>
                          <option value="450000">450000</option>
                    </select>
                    
                    
                <button id="search_logo2" onClick={search}><FiSearch /></button>
            
                 
                </div>
                
            </div>
            <div className="property_collection">

            {isLoading&& <Loader />}

                {displayProperties}
                
            </div>
            <ReactPagenate
                    previousLabel={<span><IoIosArrowBack/></span>}
                    nextLabel={<span><IoIosArrowForward/></span>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                activeClassName={"paginationActive"} />
            <Footer />
        </div>
    )
}

export default Forent

