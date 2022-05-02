import React from "react";
import styleCard from './Card.module.css'

export default function Card({id ,image ,name, genres , rating}){

    return (
        <div >
            <div  className={styleCard.card}>
            <h1 className={styleCard.name}>{name}</h1>

            <img className={styleCard.image} src={image} alt="img not found" width='350px' height='350px'/>

            <h2 className={styleCard.h2}>Genres : {genres}</h2>
            </div>

        </div>
    )
}
