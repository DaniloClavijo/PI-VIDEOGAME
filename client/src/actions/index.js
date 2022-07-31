import axios from 'axios'
// aca tendre las acciones , 
//1er acccion traerme todos los videojuegos de la api y de la base de datos 

export function getVideogames (){

    return async function(dispatch){

        var json = await axios.get('http://localhost:3001/videogames');

        return dispatch ({
            type : 'GET_ALL_VIDEOGAMES', 
            payload : json.data
        })
    }
}

export function getAllGenres (){

    return async function(dispatch){

        var infoGenres = await axios.get('http://localhost:3001/genres');

        var genresMap = infoGenres.data.map(el => el.name)

        return dispatch ({

            type : 'GET_GENRES', 
            payload : genresMap

        })
    }
    
}


 /* export function getAllPlatforms (){

    return async function(dispatch){

        var infoPlatforms = await axios.get('http://localhost:3001/platforms');

        //console.log(infoPlatforms)

        return dispatch ({

            type : 'GET_PLATFORMS', 
            payload : infoPlatforms.data

        })
    }
    
}  */

//promesas 
 export function getAllPlatforms (){

    return function(dispatch){

        fetch('http://localhost:3001/platforms')
        .then(response => response.json())
        .then(json => dispatch({

            type : 'GET_PLATFORMS', 
            payload : json

        }))

    }
} 


// hago una funcion que me ayude a renderizar de una cada carta de detalle, ya que se queda pegado en un detalle anterior, esto es por que tarda en renderizarse en verse un cambio en el estado.
export function cleanDetail() {
    return { 
      type: "CLEAN_DETAIL",
      payload: {},
    };
  }

// buscar un videojuego por name 

export function getNameVidegames (name) {
    
    return async function(dispatch){
        try {


        var json = await axios.get ('http://localhost:3001/videogames?name=' + name)

         //console.log(name)
         console.log(json.data)

            return dispatch({
                type: 'GET_VIDEOGAMES_BY_NAME' , 
                payload : json.data
            })
        
        
    } catch (error) {
        console.log(error)
        
    }
}
}
//platforms

export function filterCreated(payload){

    console.log(payload)

    return {
        type : 'FILTER_CREATED',
        payload 
    }

}

export function orderByName (payload){

    return{
        type : 'ORDER_BY_NAME',
        payload
    }
}


export function orderByRating (payload){

    return{
        type : 'ORDER_BY_RATING',
        payload
    }
}

export function filterByGenres(payload){

    //console.log(payload)

    return{
        type : 'FIlTER_GENRES',
        payload
    }

}

export function postVideogame(payload){

    return async function(dispatch){

        const response = await axios.post('http://localhost:3001/videogame' , payload)

        return response;
    }
}

export function getDetail (idVideogame){
    
    return async function(dispatch){
        try {

            var json = await axios.get('http://localhost:3001/videogames/' + idVideogame);

            return dispatch({
                type : 'GET_DETAILS' , 
                payload : json.data
            })
  
        } catch (error) {
            console.log(error)
            
        }
    }
}
