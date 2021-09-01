
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
    const url = "https://ict-yep.herokuapp.com/api/v1/properties";
    const [isLoading,setIsLoading] = useState(true)
useEffect(() => {
    axios.get(url).then((response) => {
        setProperties(response.data.data);
        if (response.data.data) {
    //console.log(response.data)
    setProperties(response.data.data)
    setIsLoading(false)
}
    });
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
        return <Card id={property.id} name={property.propertyType} city={property.city} 
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
                    <select name="" id="">
                        <option value="">Property Type</option>
                    </select>
                     <select name="" id="">
                        <option value="">Location</option>
                    </select>
                     <select name="" id="">
                        <option value="">No. of Bedrooms</option>
                    </select>
                     <select name="" id="">
                        <option value="">Amount Range</option>
                    </select>
                    
                    <input type="text" />
                <span id="search_logo2"><FiSearch /></span>
            
                 
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

