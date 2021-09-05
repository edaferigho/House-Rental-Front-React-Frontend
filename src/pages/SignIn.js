
import { React, useState, useReducer} from 'react';
//import { React, useState, useReducer, useEffect } from 'react';
//import { Redirect,NavLink,Link,useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { BsEyeSlash, BsEye } from 'react-icons/bs'
import axios from 'axios';
import './SignIn.css'
import Modal from '../components/Modal';


 const url = "https://ict-yep.herokuapp.com/api/v1/users/signin"
const reducer = (state,action) => {
    switch (action.type) {
        case 'ERROR':
            return { ...state, showError: true, errorMessage: 'Enter email and password!' }
        case 'EMAIL_ERROR':
            return { ...state, showError: true, errorMessage: 'Invalid email!' }
        case 'PASSWORD_ERROR':
            return { ...state, showError: true, errorMessage: 'Password cannot be less than 6 characters' }
        case 'CLOSE_MESSAGE':
            return { ...state, showError: false }
        case 'LOGIN_FAILED':
            return {...state,showError:true,errorMessage:'Email or password is Incorrect! Please Signup'}
        default:
            return state
    }
}
const defaultState = {
    showError: false,
    errorMessage:''
}
function SignIn({ showSignIn, clickeventUp,setIsShowSigIn }) {
    let history = useHistory()
    const [showPassword, setShowPassword] = useState(false)
    const [state,dispatch] = useReducer(reducer,defaultState)

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
   // const [showError,setShowError] = useState(true)
    const show = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email || !password) {
            dispatch({type:'ERROR'})
        }
        else if (!email.includes('@') || !email.includes('.')) {
            dispatch({type:'EMAIL_ERROR'})
        }
        else if (password.length < 6) {
            dispatch({type:'PASSWORD_ERROR'})
        }
        else {
            try {
               const response = await axios.post(url, {
                email, password
            })
            console.log(response)
                 localStorage.setItem('authorization',response.data.token)
            console.log(response.data.user)
            
            // <Redirect to="/dashboard" />
            // submit to backend
            history.push({pathname:`dashboard/${response.data.user._id}`,state:{user:response.data.user}})
            setIsShowSigIn(false) 
            
           
            } catch (error) {
                dispatch({type:'LOGIN_FAILED'})
            }
            
        }
    }
    const closeMessage = () => {
        dispatch({type:'CLOSE_MESSAGE'})
    }
    return (
        <div className={showSignIn ? "signin-page show" : "signin-page"}>
            { state.showError&&<Modal message={state.errorMessage} closeModal={closeMessage}  />}
            <p id="big">Welcome Back!</p>
            <p>Find your perfect dream with just a few steps</p>
            
    
            <div className="form-signin">
                <div className="form-group ">
                <label htmlFor="">Email Address</label>
                    <input className="large-input" type="email" name="email" value={email} onChange={ (e)=>setEmail(e.target.value)}/>
                    </div>
                    {/* here */}
                     <div className=" form-group ">
                        <label htmlFor="">Password</label>
                        <div className="password-field">
                        <input className="large-input" type={showPassword?"text":"password"} name="password" value={password} onChange={ (e)=>setPassword(e.target.value)}/>
                            <i onClick={show}>{showPassword?<BsEye />:<BsEyeSlash /> }</i>
                        </div>
                       
                </div>
                </div>
             
            <div className="remember-me">
                <input type="checkbox" name="" id="" />
          <span>Remember me<a href="#rt">Forgot Password</a></span>
            </div>
            <div className="signin-btn">
                <button id="btn" onClick={ handleSubmit}>Sign In</button>
                <p>Don't have an account yet? <button onClick={clickeventUp }>SignUp</button></p>
            </div>
            
        </div>

    )
}

export default SignIn
