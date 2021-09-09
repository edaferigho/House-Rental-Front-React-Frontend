import {React,useState} from 'react';
import './Homepage.css';
//import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import Footer from '../components/Footer';
//import Backdrop from '../components/Backdrop';
//import Signup from './Signup';
function Homepage() {
  const [searchedProperties, setSearchedProperties] = useState([])
  
  return (
    <div className="Home">
      
      <Hero setSearchedProperties={ setSearchedProperties}/>
      <Featured searchedProperties={searchedProperties} />
      <Footer />
    </div>
  );
}

export default Homepage;
