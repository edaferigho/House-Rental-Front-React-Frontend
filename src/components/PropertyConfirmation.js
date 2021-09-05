import React from 'react'
import './PropertyConfirmation.css'
function PropertyConfirmation({confirmation,clickeventIn}) {
    return (
        <div className={confirmation?"show-confirm":"hide-comfirm"} >
        <div className="confirmation" >
            <img src="/assets/registration.png" alt="" />
            <p>Property Creation Successful!</p>   
            </div>
            </div>
    )
}

export default PropertyConfirmation
