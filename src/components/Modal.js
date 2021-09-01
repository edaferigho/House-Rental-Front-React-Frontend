import {React,useEffect} from 'react'
import './Modal.css'
function Modal({ message, closeModal }) {
    useEffect(() => {
        setTimeout(() => {
           closeModal()
       },3000)
    })

    return (
        <div>
            <p id="error">{message }</p>
        </div>
    )
}

export default Modal
