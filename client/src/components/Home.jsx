
import React from "react";
import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'

//importarme todas las acciones para poder ejecutarlas cuando las necesite 
import { getVideogames , getAllGenres ,filterCreated, orderByName, orderByRating ,  filterByGenres , cleanDetail}  from "../actions";


//styles
import styleHome from './Home.module.css'

/////////////////////////componentes importados///////////////
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBard from './SearchBard';


///**********************//

export default function Home (){

    // usamos hooks
    const dispatch = useDispatch();

    // me traigo lo que voy a renderizar, el estado donde estan todos los videogames api+dB

    const videogames = useSelector((state) => state.videogames);

    
    const genres = useSelector((state) => state.allGenres)


    ////////////////////ESTADOS LOCALES Y LOGICA PAGINADO///////////////
 // 1) estado en el cual tenga la pagina actual y un set de esa pagina actual
    
 const [currentPage,SetCurrentPage] = useState(1); // seteo esa pagina actual en (1)

 // 2) estado en el cual la cantidad de perros por pagina y una variable para poder setear la cantidad de perros que quiero.

 const [vgPerPage,setVgPerPage] = useState(15) // en este caso segun el readmi pide que los perros mostrados por pagina sean (15)

 // 3) creo una constante en la cual voy a tener el indice (es un array) de el ultimo dog que tengo en la pagina 

 const indexOfLastVg = currentPage * vgPerPage ;  // 15

  // 4) creo una constante en la cual voy a tener el indice (es un array) de el primer dog que tengo en la pagina 

 const indexOfFirstDogs = indexOfLastVg - vgPerPage;  // 15-15 = 0 

 // 5)  creo una variable que sera la que usare para renderizar; la cual sera la cantidad de dogs que tengo en la pagina actual ... constante que guarde todos los personajes en cada pagina ... en donde tengo todos los perros? en mi constante allDogs.. 
 // entonces puedo usar un slice (divide un array y tomar una porcion dependiendo lo que le pase por parametro )


 const currentVg = videogames.slice(indexOfFirstDogs , indexOfLastVg)
 // aca estaria dividiendo todo mi array desde la posicion 0 hasta la posicion 8 

 // pagina actual **** indice primer Dog**** indice ultimo dog

 //    1          ||         0           ||           15

 //    2          ||         16            ||          31


 // 6) hago una funcion llamada paginado a la cual le paso el numero de la pagina actual , y la logica que hara esa funcion es setear la pagina actual en el numero de pagina que me pasan por la funcion (me ayudara al renderizado)

 function paginado(pageNumber){

     SetCurrentPage(pageNumber)

 }

 const [order, setOrder] = useState('')
 // ahora vamos a disparar la accion que me trae todos los personajes y carga a mi estado allVideogames con todos los videgames
 
 useEffect(() => {
     dispatch(getVideogames()) // disparo la accion que me va a traer todos los videojuegos en este componente 
     dispatch(getAllGenres())  // disparo la accion que me va a traer todos los videojuegos en este componente 

     dispatch(cleanDetail()) // cuando vuelvo a home despues de haber cargado mi estado details con el detalle de un videojuego, lo que hago es despachar esta accion que limpie el detalle 
    },[dispatch])
    
    //console.log(videogames)
    //console.log(genres)
    
    function handleCreated(e){
        
        dispatch(filterCreated(e.target.value))
        SetCurrentPage(1)
        
    }

    function handleActualizar(e){
        e.preventDefault()
        dispatch(getVideogames())
        dispatch(getAllGenres()) 
    }
    
    function handleOrderName(e){
        dispatch(orderByName(e.target.value))
        setOrder(e.target.value)
        SetCurrentPage(1)
    }

    function handleByRating(e){
        dispatch(orderByRating(e.target.value))
        setOrder(e.target.value)
        SetCurrentPage(1)
    }
    
    function handleFilterGenres(e){
        dispatch(filterByGenres(e.target.value))
        e.preventDefault(e)
        SetCurrentPage(1)
    }


return(
    
    <div className={styleHome.background} >

            <div  className={styleHome.options}>
            <button onClick={e => handleActualizar(e)} className={styleHome.btn}>volver a cargar videogames</button>

            <Link to='/videogame'   className={styleHome.link} >CREA TU PROPIO VIDEOGAME</Link>

            <SearchBard /* className={styleHome.options} *//>

            </div>


            <h1 className={styleHome.h1}
            >Los mejores videojuegos de la red</h1>



            <div className={styleHome.separacion}>
            <select  className={styleHome.select} onChange={e => handleCreated(e)}>
            <option value='All'>Todos</option>
            <option value='Created'>Creados</option>
            <option value='Api'>existente</option>
            </select>


            <select className={styleHome.select} onChange={e => handleOrderName(e)}>
            <option value='All'>Todos</option>
            <option value='asc'>A to Z</option>
            <option value='desc'>Z to A</option>
            </select>


            <select  className={styleHome.select}  onChange={e => handleByRating(e)} >
            <option value='All'>Todos los Rating</option>
            <option value='MinRating'>Menor Rating</option>
            <option value='MaxRating'>Mayor Rating</option>
            </select>



{/* /////////////////Renderizado de las distintas opciones de generos  /////////////////////// */}
            <select  className={styleHome.select} onChange={ e =>  handleFilterGenres(e)}>
                    <option value ='All'>All Genres</option>
                   {  
                       genres.map( el => {
                           return(
                            <React.Fragment key={el}>
                                       <option value ={el}>{el}</option>    
                            </React.Fragment>               
                           )
                        })
                    }
            </select>
            </div>

{/* /////////////////Renderizado de Los videojuegos con sus detalles /////////////////////// */}
           <div className={styleHome.acomodar}>
           {
                
                currentVg.length ? currentVg.map(el => {
                     
                     return(
                         <div  >
                         <Link to ={`/home${el.id}`} className={styleHome.link}> {/* cada vez que me de click sobre alguna card renderizada me va a redirigir a la routa /home/id*/}
                         <Card name = {el.name} image ={el.image} genres={el.genres.join(' - ') } rating = {el.rating}  />
                         </Link>
                         </div>
                     )
                 }) 

                 : (
                    <div>
                    
                      <img
                        src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!c1024wm0"
                        alt="Loading..."
                        className={styleHome.detalle}
                        width='300px'
                        height='400px'
                      />
                    </div>
                  )
 
                 
             } 
            
            </div>
            {/* /////////////////Renderizado del Paginado/////////////////////// */}
            <Paginado vgPerPage={vgPerPage} videogames={videogames.length} paginado={paginado} ></Paginado>
            </div>
  
  
  
  
  
  
  )
  
  
  






}