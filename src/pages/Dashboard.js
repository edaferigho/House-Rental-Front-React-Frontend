import {React,useState} from 'react'
import { FiHome,FiPower } from 'react-icons/fi'
//import { BsEnvelope } from 'react-icons/bs'
import { Link,useLocation } from 'react-router-dom'
import './Dashboard.css'
import ProfileCard from '../components/ProfileCard'
import NavbarUser from '../components/NavbarUser'
//import ReactPagenate from 'react-paginate'
//import Footer from '../components/Footer'
import properties from '../data'
function Dashboard() {
    const location = useLocation()
    console.log(location.state.user)
    console.log(localStorage.getItem('authorization'))
    const [property] = useState(properties.slice(0, 100))
    const [pageNumber] = useState(0)
    const propertyPerPage = 8;
    const pagesVisited = pageNumber * propertyPerPage;

    const displayProperties = property.slice(pagesVisited, pagesVisited + propertyPerPage).map((property) => {
        return <ProfileCard id={property.id} name={property.name} city={property.city} image={property.image} price={property.price} />
    })
    // const pageCount = Math.ceil(property.length / propertyPerPage)
    // const changePage = ({selected}) => {
    //     setPageNumber(selected)
    // }

    return (
        <section>
            <NavbarUser />
        <div className="dashboard" >
            <div className="dashboard_nav">
                <ul>
                    <li><Link to="/dashboard"><span><FiHome /></span> Dashboard</Link></li>
                    {/* <li><Link><span><BsEnvelope /></span>Client Request</Link></li> */}
                    <li><Link to="/"><span><FiPower /></span>Sign Out</Link></li>
                </ul>
            </div>
                <div className="dashboard_content">
                <Link className="Link" to="/AddNewProperty"><button>+Add New</button></Link>
                    <div className="properties">
                     {displayProperties}
                    </div>
                    
            </div>
            </div>
           
            </section>
    )
}

export default Dashboard
