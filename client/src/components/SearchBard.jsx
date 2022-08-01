import { React , useState }  from "react";
import  {useDispatch} from 'react-redux'
import { getNameVidegames, getVideogames } from "../actions";
import styleSearch from './SearchBard.module.css'



export default function SearchBard(){ 


const dispatch =useDispatch(); 


// creo un estado local en el cual voy a guardar lo que escriba el usuario 

const [name , setName] = useState('')


// esta funcion lo que va a hacer es capturar lo que escribe el usuario y guardarlo en mi estado llamado name
function handleChangeInput(e){

    e.preventDefault()
    setName(e.target.value)

    console.log(name)
}


// ahora creo otra funcion que me va ayudar a enviar la informacion que capture en el estado name a el back .. el cual es el que hace el filtrado ya que yo le envio algo por query 

function handleSubmit(e){
    e.preventDefault();
    if(!name){
        alert('No escribiste ningun nombre para buscar, escribe algo')
    } else{ 
        dispatch(getNameVidegames(name))
        setName("") 
    }
}
    return(

        <div className={styleSearch.contenedor}>
            <input type="text"
            placeholder="ingrese el nombre ..."
            value={name}
            onChange={e => handleChangeInput(e)}
            className={styleSearch.input}
            
            />

            <button type='submit' onClick={e =>  handleSubmit(e)}
             className={styleSearch.btn}>Buscar</button>
        </div>






    )


}