import {React,useState,useReducer} from 'react'
import { form } from "react-bootstrap/Form";
import './AddNewProperty.css';
import FileUploadComponent from '../components/FilesUploadComponent';
import NavbarUser from '../components/NavbarUser'
import { FiHome,FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import SuccessModal from '../components/SuccessModal';
import axios from 'axios';
import Modal from '../components/Modal'

const reducer = (state,action) => {
    switch (action.type) {
        case 'NO_TITLE':
            return {...state,showSuccess:false,showError:true,errorMessage:'Title field must not be empty!'}
        case 'NO_PROPERTY_TYPE':
            return { ...state,showSuccess:false, showError: true, errorMessage: 'Property Type field cannot be empty!' }
        case 'NO_CITY':
            return { ...state, showSuccess: false, showError: true, errorMessage: 'City field cannot be empty!' }
        case 'INVALID_PRICE':
            return { ...state, showSuccess: false, showError: true, errorMessage: 'Property Price field cannot be empty!' }
        case 'IMAGE_INCOMPLETE':
            return { ...state, showSuccess: false, showError: true, errorMessage: 'Uploaded Images must be atleast 4!' }
        case 'INVALID_DESC':
            return {...state, showSuccess: false, showError: true, errorMessage: 'Property Description field cannot be empty!' }
        case 'SUCCESS':
            return { ...state, showSuccess: true, showError: false }
        case 'CLOSE_MODAL':
            return {...state, showSuccess:false, showError:false}
        default:
            return state;
    }
}
const defaultState = {
    showSuccess:false,
    showError: false,
    errorMessage:''
}
export default function AddNewProperty() {
    const [state, dispatch] = useReducer(reducer, defaultState)
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
    
    
    const add = async () => {
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
    const closeModal = () => {
            dispatch({ type: 'CLOSE_MODAL' })
        }

    const submit = async(e) => {
        e.preventDefault()
        console.log(allFiles)
        window.scrollTo(0,0)
        console.log(title)
        if (!title) {
            dispatch({type:'NO_TITLE'})
        }
        else if (!propertyType) {
            dispatch({type:'NO_PROPERTY_TYPE'})
        }
        else if (!city) {
            dispatch({type:'NO_CITY'})
        }
            else if (!amount) {
            dispatch({type:'INVALID_PRICE'})
        }
        else if(!addedFeatures){
            dispatch({type:'INVALID_DESC'})
        }
            
        else if (allFiles.length < 4) {
            dispatch({type:'IMAGE_INCOMPLETE' })
        }
        else {
            const status = await add()
        if (status === 201) {
            // Display property added successfully!
            dispatch({type:'SUCCESS'})
            
        }
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
          {/* {isShowConfirm&& <PropertyConfirmation />}   */}
            <div className="form_container">
                
            
                <form class="myform row g-4 gy-2 gx-3 align-items-center">
                    <div  class="col-12 modal-row">
                        {state.showError && <Modal message={state.errorMessage} closeModal={closeModal} />}
                        {state.showSuccess && <SuccessModal message={state.errorMessage} closeModal={closeModal} />}
                    </div>    
            <div class="col-12">
                <label for="inputEmail4" class="form-label ">Title</label>
                <input type="text" class="inputTitle input"  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div class="col-md-5">
                <label for="inputCity" class="input form-label">Type of Property</label>
                <select  class="typeprop input "  onChange={(e)=>setPropertyType(e.target.value)}>
                <option selected></option>
                <option>Bungalow</option>
                <option>Storey Building</option>
                <option>Duplex</option>
                <option>Estate</option>
                </select>
            </div>
            <div class="NumberBedroom col-md-4">
                <label for="inputState" class="form-label">Number of Bedrooms</label>
                        <select class="No_bedroom input" value={numberOfRooms } onChange={(e)=>setNumberOfRooms(e.target.value)}>
                <option selected></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                </select>
            </div>
            <div class="carpark col-md-3">
                <label for="inputZip" class="form-label">Car Park</label>
                <select  class="Car_Park input" onChange={(e)=>setPark(e.target.value)}>
                <option selected></option>
                <option>true</option>
                <option>false</option>
                </select>
            </div>
            <div class=" cityselect col-md-6">
                <label for="inputState" class="form-label">City</label>
                <select  class="City_form input" onChange={(e)=>setCity(e.target.value)}>
                <option selected></option>
                <option>Asaba</option>
                <option>Warri</option>
                <option>Ughelli</option>
                            <option>Sapele</option>
                            <option>Agbor</option>
                </select>
            </div>
            <div class="lGAsel col-md-6">
                <label for="inputZip" class="form-label">Local Goverment Area</label>
                <select  class="Local_Goverment_Area input" value={localGov} onChange={(e)=>setLocalGov(e.target.value)}>
                <option selected></option>
                <option>Aniocha South</option>
                <option>Aniocha North</option>
                <option>Ika South</option>
                            <option>Ika North</option>
                            <option>Ughelli North</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" class="addFeature form-label">Landmark</label>
                <textarea class="Landmark input" aria-label="With textarea" name="landmark" onChange={(e)=>setLandMark(e.target.value)}></textarea>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" class="addFeature form-label">Additional Features</label>
                <textarea class="Additional_Features input" aria-label="With textarea" name="addedFeatures"onChange={(e)=>setAddedFeatures(e.target.value)}></textarea>
            </div>
            <div class="col-md-6">
                <label for="inputState" class="form-label" >Amount</label>
                <input  class=" amountinput input" placeholder="₦"name="amount" onChange={(e)=>setAmount(e.target.value)}></input>
            </div>
            <div class="col-md-6">
                <label for="inputZip" class="form-label">Phone Number</label>
                <input  class="phoneNo input" placeholder="090***" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>       
            </div>
            <div class="field col-md-12" align="left">
                <label className="addFeature form-label">Upload Picture</label>
                        <FileUploadComponent setAllFiles={setAllFiles }/>
            </div>
   
            <div class="col-md-12">
                <button type="submit" class="ADD_NEW" onClick={submit}>Upload</button>
            </div>
        </form>
        
    </div>
    </section>
    )
}
