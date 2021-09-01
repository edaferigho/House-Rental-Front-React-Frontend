import React from 'react'
import { form } from "react-bootstrap/Form";
import '../components/AddNewProperty.css';
import FileUploadComponent from '../components/FilesUploadComponent';
import NavbarUser from '../components/NavbarUser'
import { FiHome,FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Dashboard.css'
//import ImageUpload from '../Component/ImageUpload'
export default function AddNewProperty() {
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
    <div className="form_container">
        <form class="myform row g-4 gy-2 gx-3 align-items-center">
            <div class="col-12">
                <label for="inputEmail4" class="form-label">Title</label>
                <input type="text" class="inputTitle" id="inputEmail4"></input>
            </div>
            <div class="col-md-5">
                <label for="inputCity" class=" form-label">Type of Property</label>
                <select id="inputState" class="typeprop ">
                <option selected></option>
                <option>Bungalow</option>
                <option>Storey Building</option>
                <option>Duplex</option>
                <option>Estate</option>
                </select>
            </div>
            <div class="NumberBedroom col-md-4">
                <label for="inputState" class="form-label">Number of Bedrooms</label>
                <select id="inputState" class="No_bedroom">
                <option selected></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                </select>
            </div>
            <div class="carpark col-md-3">
                <label for="inputZip" class="form-label">Car Park</label>
                <select id="inputState" class="Car_Park">
                <option selected></option>
                <option>Yes</option>
                <option>No</option>
                </select>
            </div>
            <div class=" cityselect col-md-6">
                <label for="inputState" class="form-label">City</label>
                <select id="inputState" class="City_form">
                <option selected></option>
                <option>Asaba</option>
                <option>Warri</option>
                <option>Ughelli</option>
                <option>Sapele</option>
                </select>
            </div>
            <div class="lGAsel col-md-6">
                <label for="inputZip" class="form-label">Local Goverment Area</label>
                <select id="inputState" class="Local_Goverment_Area">
                <option selected></option>
                <option>Aniocha South</option>
                <option>Aniocha North</option>
                <option>Ika South</option>
                <option>Ika North</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" class="addFeature form-label">Landmark</label>
                <textarea class="Landmark" aria-label="With textarea"></textarea>
            </div>
            <div class="col-md-6">
                <label for="inputAddress2" class="addFeature form-label">Additional Features</label>
                <textarea class="Additional_Features" aria-label="With textarea"></textarea>
            </div>
            <div class="col-md-6">
                <label for="inputState" class="form-label">Amount</label>
                <input id="inputState" class=" amountinput" placeholder="N"></input>
            </div>
            <div class="col-md-6">
                <label for="inputZip" class="form-label">Phone Number</label>
                <input id="inputState" class="phoneNo" placeholder="090***"></input>       
            </div>
            <div class="field col-md-12" align="left">
                <label className="addFeature form-label">Upload Picture</label>
                <FileUploadComponent />
            </div>
   
            <div class="col-md-12">
                <button type="submit" class="ADD_NEW">Upload</button>
            </div>
        </form>
        
    </div>
    </section>
    )
}
