import { React, useState,useEffect } from 'react'
import axios from 'axios'
import ReactPagenate from 'react-paginate'
import { FiHome, FiPower } from 'react-icons/fi'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
//import { BsEnvelope } from 'react-icons/bs'
import { Link,useHistory } from 'react-router-dom'
import './Dashboard.css'
import ProfileCard from '../components/ProfileCard'
import NavbarUser from '../components/NavbarUser'

 
const url = 'https://ict-yep.herokuapp.com/api/v1/agents/properties/'
const config = {
    headers: { 'Authorization': localStorage.getItem('authorization') }
}



function Dashboard() {
    const history = useHistory()
    const [properties, setProperties] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    
    // delete Property
    const deleteProperty = async (id) => {
     axios.delete(`https://ict-yep.herokuapp.com/api/v1/agents/properties/${id}`,config)
    getProperties()

    }
    const signOut = () => {
        localStorage.setItem("authorization", null)
        localStorage.setItem("userId", null)
        history.push("/")
    }
    // get properties
    const getProperties = async () => {
        const response = await axios.get(url, config)
        if (response.data) {
            setProperties(response.data.data)
             console.log(properties)
        }
        
   
    }
    let value=''
    useEffect(() => {
        // eslint-disable-next-line
        value =''
        getProperties()
    },[value])
    // const location = useLocation()
    // console.log(location.state.user)
    // console.log(localStorage.getItem('authorization'))
    // const [property] = useState(properties.slice(0, 100))
    const propertyPerPage = 8;
    const pagesVisited = pageNumber * propertyPerPage;

    const displayProperties = properties.slice(pagesVisited, pagesVisited + propertyPerPage).map((property) => {
        return <ProfileCard id={property._id} name={property.propertyType} city={property.city} image={property.propertyImages[0]} price={property.propertyPrice} deleteProperty={deleteProperty} />
    })
    const pageCount = Math.ceil(properties.length / propertyPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <section>
            <NavbarUser />
        <div className="dashboard" >
            <div className="dashboard_nav">
                <ul>
                    <li><Link to="/dashboard"><span><FiHome /></span> Dashboard</Link></li>
                    {/* <li><Link><span><BsEnvelope /></span>Client Request</Link></li> */}
                    <li onClick={signOut}><span><FiPower /></span>Sign Out</li>
                </ul>
            </div>
                <div className="dashboard_content">
                <Link className="Link" to="/AddNewProperty"><button>+Add New</button></Link>
                    <div className="properties">
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
                    
            </div>
            </div>
           
            </section>
    )
}

export default Dashboard
