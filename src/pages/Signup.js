import { React, useState, useReducer } from 'react'
import axios from 'axios'
import {BsEyeSlash,BsEye} from 'react-icons/bs'
import './Signup.css'
import Modal from '../components/Modal'


const reducer = (state,action) => {
    switch (action.type) {
        case 'NAME_ERROR':
            return { ...state, showError: true, errorMessage: 'First name or last name  field cannot be empty' }
        case 'NO_EMAIL':
            return { ...state, showError: true, errorMessage: 'Email field cannot be empty' }
        case 'INVALID_EMAIL':
            return { ...state, showError: true, errorMessage: 'Invalid email!' }
        case 'NO_PASSWORD':
            return { ...state, showError: true, errorMessage: 'Password field cannot be empty!' }
        case 'INVALID_PASSWORD':
            return { ...state, showError: true, errorMessage: 'Password cannot be less than 6 characters' }
        case 'PASSWORD_MISMATCH':
            return { ...state, showError: true, errorMessage: 'Password is different from Confirm password' }
        case 'AGREEMENT_ERROR':
            return {...state,showError:true,errorMessage:'You must agree to terms and condition!'}
        case 'CLOSE_MODAL':
            return { ...state, showError: false }
        case 'EMAIL_EXIST':
            return {...state,showError:true, errorMessage:'Email already exist!'}
        default:
            return state;
    }
}

const defaultState = {
    showError: false,
    errorMessage:''
}
const instance = axios.create(
{
        baseURL: "",
        withCredentials: false,
        headers: {
            'Content-Type':'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }
  } 
)

function Signup({ showSignUp, clickeventIn, showConfirmation }) {
    // I used http://localhost:9000 for testing, please replace it with our Hiroku address.
    const url='https://ict-yep.herokuapp.com/api/v1/users'
    // const url = "http://localhost:9000/api/v1/users"
   
    const [showPassword, setShowPassword] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreed, setAgreed] = useState(false)

 

    
    const [state, dispatch] = useReducer(reducer, defaultState)
    //Function that hides and shows password
    const show = () => {
        setShowPassword(!showPassword)
    }
    // This function handles the submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            dispatch({ type: 'NAME_ERROR' })
        }
        else if (!email) {
            dispatch({ type: 'NO_EMAIL' })
        }
        else if (!email.includes('@') || !email.includes('.')) {
            dispatch({ type: 'INVALID_EMAIL' })
        }
        else if (!password || !confirmPassword) {
            dispatch({ type: 'NO_PASSWORD' })
        }
        else if (password.length < 6) {
            dispatch({ type: 'INVALID_PASSWORD' })
        }
        else if (password !== confirmPassword) {
            dispatch({ type: 'PASSWORD_MISMATCH' })
        }
        else if (!agreed) {
            dispatch({ type: 'AGREEMENT_ERROR' })
        }
        else {
            
            //function that submits the form data should be inserted here and a response should be requested before showConfirmation
            const response = await instance.post(url, {
                firstName,
                lastName,
                phone,
                email,
                password,
                confirmPassword
            })
            console.log(response)

           
                if (response.data.status == 'success') {
                    setFirstName('')
                    setLastName('')
                    setPhone('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    showConfirmation()
                }
                else {

                    dispatch({type:'EMAIL_EXIST'})
                    // I am yet to create this modal
                    //showFailure()
                }
            
            
        }
    }
        const closeModal = () => {
            dispatch({ type: 'CLOSE_MODAL' })
        }

        return (
            <div className={showSignUp ? "signup-page show" : "signup-page"}>
                {state.showError && <Modal message={state.errorMessage} closeModal={closeModal} />}
                <p>Find your perfect dream with just a few steps</p>
                <p id="big">Register Now!</p>
                <div className="top-level">
                    <div className="form-level">
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <input type="text" name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <input type="text" name="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="top-level">
                    <div className="form-level">
                        <div className="form-group">
                            <label htmlFor="">Email Address</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Phone Number</label>
                            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="top-level">
                    <div className="form-level">
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <div className="password-field">
                                <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <i onClick={show}>{showPassword ? <BsEye /> : <BsEyeSlash />}</i>
                            </div>
                       
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Confirm Password</label>
                            <div className="password-field">
                                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <i onClick={show}>{showPassword ? <BsEye /> : <BsEyeSlash />}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="privacy-group">
                    <input type="checkbox" name="" id="" onChange={(e) => setAgreed(e.target.checked)} />

                    <span>I agree to <a href="#dfdf">Privacy policies</a>, <a href="#dfdfd">Terms & Conditions</a></span>
                </div>
                <div className="signup-btn">
                    <button id="btn" onClick={handleSubmit}>create account</button>
                    <p>Already have an Account? <button onClick={clickeventIn}>Sign In</button></p>
                </div>
            
            </div>
        )
    
}
export default Signup