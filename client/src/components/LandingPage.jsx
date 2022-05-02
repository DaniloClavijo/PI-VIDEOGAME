import React from 'react'
import {Link} from 'react-router-dom'
import styleLp from './LandingPage.module.css'



export default function LandingPage () {

    

    return(
        <div className={styleLp.background}>
            <Link to ='/home'> 
            <button  className={styleLp.btn}>START</button>
            </Link>
        </div>
    )

}