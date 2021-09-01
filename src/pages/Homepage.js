import './Homepage.css';
//import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import Footer from '../components/Footer';
//import Backdrop from '../components/Backdrop';
//import Signup from './Signup';
function Homepage() {
  return (
    <div className="Home">
      
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}

export default Homepage;
