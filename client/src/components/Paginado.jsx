import React from "react";
import stylePaginado from './Paginado.module.css'

export default function Paginado({vgPerPage , videogames , paginado}){

    const pageNumbers = []

    // i va a recorrer Math.ceil(allDogs/DogsPerPage)
    // eso sera el numero redondo de dividir todos los Dogs / los perros por pagina que quiero 

    for (let i = 1; i <= Math.ceil(videogames/vgPerPage); i++) {
        
        pageNumbers.push(i)// sera un arreglo de numeros que era el resultado de dividirMath.ceil(allDogs/DogsPerPage) 
        
    }

    return(
        
            <div className={stylePaginado.ord} 
            >
               
                    {pageNumbers && pageNumbers.map(number => (
                         <li className={stylePaginado.ord} key = {number}>
                        <button className={stylePaginado.btn}  onClick={() => paginado(number)}>{number}</button>
                        </li>
                   ))}
              
            </div>
        
    )
}