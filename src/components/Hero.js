import { React, useState } from 'react'
import axios from 'axios'
import { BiSearch } from 'react-icons/bi'


import './Hero.css'



const url = `https://ict-yep.herokuapp.com/api/v1/properties?`;
function Hero({setSearchedProperties}) {
    const value = ''
    const [selected0, setSelected0] = useState('All')
    const [selected1, setSelected1] = useState('All Property types')
    const [selected2, setSelected2] = useState('100000000')
    const [city, setCity] = useState('')
    const [propertytype, setPropertyType] = useState('')
    const [maxprice, setMaxPrice] = useState('')
    function handleChange0(e) {
        let { options, selectedIndex } = e.target
        setSelected0(options[selectedIndex].text)
        setCity(options[selectedIndex].text)
        selectedIndex = 0;
    }
     function handleChange1(e) {
        let { options, selectedIndex } = e.target
        setSelected1(options[selectedIndex].text)
         setPropertyType(options[selectedIndex].text)
         selectedIndex = 0;
    }
     function handleChange2(e) {
        let { options, selectedIndex } = e.target
        setSelected2(options[selectedIndex].text)
         setMaxPrice(options[selectedIndex].text)
         selectedIndex = 0;
    }
    
     const search = () => {
         axios.get(url, { params: { propertytype, city, maxprice } }).then((response) => {
             setSearchedProperties(response.data.data)
    });
    }
    

    return (
        <div className="hero">
            <figure>
                <img src="/assets/hero.jpg" className="img-fluid" alt="hero" />
                <h1>FIND YOUR DREAM HOME WITH US!</h1>
            </figure>

            {/* <img className="testimage" src="/assets/FIND YOUR DREAM hOME WITH US!.svg" alt="hero2" /> */}

            <div className="hero-search container">
                <div className="search search-0 container">
                    <div className="search-selector container">
                        <span>Location</span>
                      
                    <select name="" id="selector" value={value} onChange={handleChange0} >
                        <option selected disabled value=""></option>
                        <option value="Ughelli">Ughelli</option>
                        <option value="Asaba">Asaba</option>
                        <option value="Warri">Warri</option>
                        <option value="Ogwashi-Uku">Ogwashi-Uku</option>
                        <option value="Kwale">Kwale</option>
                        <option value="Ozoro">Ozoro</option>
                        <option value="Oleh">Oleh</option>
                    </select>
                    </div>
                    <p>{ selected0}</p>
                </div>
                <div className="ver-line1"></div>
                   <div className="search search-1">
                    <div className="search-selector">
                     <span>Property Type</span>
                    <select name="" id="selector" value={value} onChange={handleChange1} >
                            <option selected disabled value=""></option>
                            <option value="Semi-Detached Bungalow">Semi-Detached Bungalow</option>
                        <option value="Bungalow">Bungalow</option>
                            <option value="Duplex">Duplex</option>
                            <option value="3-Bedroom Flat">3-Bedroom Flat</option>
                            <option value="2-Bedroom Flat">2-Bedroom Flat</option>
                            <option value="Stores">Stores</option>
                            <option value="Warehouse">Warehouse</option>
                    </select>
                    </div>
                    <p>{ selected1}</p>
                </div>
                <div className="ver-line2"></div>
                   <div className="search search-2">
                    <div className="search-selector">
                     <span>Max Price</span>
                        <select name="" id="selector" value={value} onChange={handleChange2} >
                           <option selected disabled value=""></option> 
                          <option value="40000">40000</option>
                        <option value="50000">50000</option>
                        <option value="60000">60000</option>
                        <option value="70000">70000</option>
                        <option value="80000">80000</option>
                        <option value="90000">90000</option>
                        <option value="100000">100000</option>
                        <option value="800000">800000</option>
                        <option value="900000">900000</option>
                        <option value="1000000">1000000</option>
                    </select>
                    </div>
                    <p>₦{ selected2}</p>
                    
                </div>
                <button onClick={search} className="btn"  ><BiSearch /></button>
            </div>
        </div>
    )
}

export default Hero
