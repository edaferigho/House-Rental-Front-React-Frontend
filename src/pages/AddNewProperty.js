import {React,useState} from 'react'
import { form } from "react-bootstrap/Form";
import '../components/AddNewProperty.css';
import FileUploadComponent from '../components/FilesUploadComponent';
import NavbarUser from '../components/NavbarUser'
import { FiHome,FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import PropertyConfirmation from '../components/PropertyConfirmation';
import axios from 'axios';
import { ModalBody } from 'react-bootstrap';
//import ImageUpload from '../Component/ImageUpload'
export default function AddNewProperty() {
    const [title, setTitle] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [numberOfRooms, setNumberOfRooms] = useState('')
    const [park, setPark] = useState('')
    const [localGov, setLocalGov] = useState('')
    const [city, setCity] = useState('')
    const [landMark, setLandMark] = useState('')
    const [addedFeatures, setAddedFeatures] = useState('')
    const [amount, setAmount] = useState('')
    const [phone, setPhone] = useState('')
    const [allFiles, setAllFiles] = useState([])
    const [isShowConfirm,setIsShowConfirm] = useState(false)


    const url = 'https://ict-yep.herokuapp.com/api/v1/agents/properties/'
    // const url = 'http://locahost:9000/api/v1/agents/properties/'
    
    const headers= { 'Authorization': localStorage.getItem('authorization'), }
    
    console.log(localStorage.getItem('authorization'))
    let bodyFormData = new FormData()
    bodyFormData.append('title',title)
    bodyFormData.append('propertyType',propertyType)
    bodyFormData.append('carPark', park)
    bodyFormData.append('landMark',landMark)
    bodyFormData.append('propertyPrice', amount)
    bodyFormData.append('propertyDescription', addedFeatures)
    bodyFormData.append('city', city)
    
    
    const add = async() => {
        for (const file of allFiles) {
        bodyFormData.append('property-images',file)
    }
        const response = await axios({
            url:url,
            method:"post",
            headers,
            data:bodyFormData
        })
        console.log(response.status)
        return response.status
    }
    
    const onSubmit = async(e) => {
        e.preventDefault()
        const status = await add()
        if (status === 201) {
            // Display property added successfully!
            setIsShowConfirm(true)
            
        }
        


    }
    return (
    <section>
    <NavbarUser />
    <div className="dashboard_nav">
                <ul>
                    <li><Link to="/dashboard"><span><FiHome /></span> Dashboard</Link></li>
                    {/* <li><Link><span><BsEnvelope /></span>Client Request</Link></li> */}
                    <li><Link to="/"><span><FiPower /></span>Sign Out</Link></li>
                </ul>
            </div>
          {isShowConfirm&& <PropertyConfirmation />}  
    <div className="form_container">
        <form class="myform row g-4 gy-2 gx-3 align-items-center">
            <div class="col-12">
                <label for="inputEmail4" class="form-label">Title</label>
                <input type="text" class="inputTitle" id="inputEmail4" name="title" onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div class="col-md-5">
                <label for="inputCity" class=" form-label">Type of Property</label>
                <select id="inputState" class="typeprop "  onChange={(e)=>setPropertyType(e.target.value)}>
                <option selected></option>
                <option>Bungalow</option>
                <option>Storey Building</option>
                <option>Duplex</option>
                <option>Estate</option>
                </select>
            </div>
            <div class="NumberBedroom col-md-4">
                <label for="inputState" class="form-label">Number of Bedrooms</label>
                <select id="inputState" class="No_bedroom" onChange={(e)=>setNumberOfRooms(e.target.value)}>
                <option selected></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                </select>
            </div>
            <div class="carpark col-md-3">
                <label for="inputZip" class="form-label">Car Park</label>
                <select id="inputState" class="Car_Park" onChange={(e)=>setPark(e.target.value)}>
                <option selected></option>
                <option>true</option>
                <option>false</option>
                </select>
            </div>
            <div class=" cityselect col-md-6">
                <label for="inputState" class="form-label">City</label>
                <select id="inputState" class="City_form" onChange={(e)=>setCity(e.target.value)}>
                <option selected></option>
                <option>Asaba</option>
                <option>Warri</option>
                <option>Ughelli</option>
                <option>Sapele</option>
                </select>
            </div>
            <div class="lGAsel col-md-6">
                <label for="inputZip" class="form-label">Local Goverment Area</label>
                <select id="inputState" class="Local_Goverment_Area" onChange={(e)=>setLocalGov(e.target.value)}>
                <option selected></option>
                <option>Aniocha South</option>
                <option>Aniocha North</option>
                <option>Ika South</option>
                <option>Ika North</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" class="addFeature form-label">Landmark</label>
                <textarea class="Landmark" aria-label="With textarea" name="landmark" onChange={(e)=>setLandMark(e.target.value)}></textarea>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" class="addFeature form-label">Additional Features</label>
                <textarea class="Additional_Features" aria-label="With textarea" name="addedFeatures"onChange={(e)=>setAddedFeatures(e.target.value)}></textarea>
            </div>
            <div class="col-md-6">
                <label for="inputState" class="form-label" >Amount</label>
                <input id="inputState" class=" amountinput" placeholder="N"name="amount" onChange={(e)=>setAmount(e.target.value)}></input>
            </div>
            <div class="col-md-6">
                <label for="inputZip" class="form-label">Phone Number</label>
                <input id="inputState" class="phoneNo" placeholder="090***" name="phone" onChange={(e)=>setPhone(e.target.value)}></input>       
            </div>
            <div class="field col-md-12" align="left">
                <label className="addFeature form-label">Upload Picture</label>
                        <FileUploadComponent setAllFiles={setAllFiles }/>
            </div>
   
            <div class="col-md-12">
                <button type="submit" class="ADD_NEW" onClick={onSubmit}>Upload</button>
            </div>
        </form>
        
    </div>
    </section>
    )
}
