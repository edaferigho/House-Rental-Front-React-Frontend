import React from 'react'
import './Confirmation.css'
function Confirmation({confirmation,clickeventIn}) {
    return (
        <div className={confirmation?"show-confirm":"hide-comfirm"} >
        <div className="confirmation" >
            <img src="/assets/registration.png" alt="" />
            <p>Account Registration Successful!</p>
          <button onClick={clickeventIn}>Sign In</button>   
            </div>
            </div>
    )
}

export default Confirmation
