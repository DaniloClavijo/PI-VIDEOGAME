import {React , useEffect} from "react";
import {Link , useParams} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { getDetail } from "../actions";
import d from './Detail.module.css'
/* image , name , genres , description , released , rating , platforms */

export default function Detail (props){

    //console.log(props)

    const {id} =props.match.params

    //const {id} = useParams()



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch,id ])

    const myVideogame = useSelector( (state) => state.details )

    return (


       <div className={d.contenedor} >

            <Link to = '/home'>
            <button className={d.btn}>Volver </button>
            </Link>
       

            {myVideogame.length  ? 
            
            <div className={d.detalle}>
                <h1 className={d.titulo}> {myVideogame[0].name}</h1> 
                
                <h3 className={d.carta}> {<img className={d.img} src={myVideogame[0].image} alt="img not found" width='500px' height='500px'/>} </h3>
               <b className={d.p}>{myVideogame[0].description?.replace(/<[^>]+>/g, '')}  </b>
               <h3 className={d.genres}> generos :  {myVideogame[0].genres.join(' - ')} </h3>
               <h3 className={d.genres}> rating :  {myVideogame[0].rating} </h3>
               <h3 className={d.genres}>  plataformas :  {myVideogame[0].platforms.join(' - ') } </h3>
               <h3 className={d.genres}> fecha de lanzamiento : {myVideogame[0].released} </h3>

            </div>   :( <div>
                      <img
                        src="https://i.giphy.com/media/WiIuC6fAOoXD2/giphy.gif"
                        alt="Loading..." height='400px'width='300px'
                        className={d.detalleLoader}
                      />
                    </div>)
            }
        

            </div>
            )


        }
            
        