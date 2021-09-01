import React from 'react'
import './Backdrop.css'

function Backdrop({showUp,showIn,showConfirm,clickevent}) {
    return (
        
          <div className={showUp||showConfirm||showIn?"backdrop show":"backdrop"} onClick={clickevent}></div>   
        
    )
}

export default Backdrop
