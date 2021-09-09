import { React, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './SuccessModal.css'
function SuccessModal({ message, closeModal }) {
    let history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            closeModal()
            history.push(`/dashboard/${localStorage.getItem("userId")}`)
       },3000)
    })

    return (
        <div>
            <p id="success">Property created successfully!</p>
        </div>
    )
}

export default SuccessModal