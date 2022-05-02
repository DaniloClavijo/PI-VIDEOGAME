// armar el reducer , el reducer recibe como parametro el estado inicial y la accion 

const initialState = {

    videogames :  [],
    copyAllVideogames : [],
    allGenres : [],
    platforms : [],
    details : []

}


function rootReducer(state = initialState , action){

    switch (action.type) {

        case 'GET_ALL_VIDEOGAMES':
        return{
            ...state,
            videogames : action.payload,
            copyAllVideogames : action.payload
        }

        case 'GET_GENRES': 
        return{
            ...state,
            allGenres : action.payload
           
        }
        case 'GET_PLATFORMS': 
        return{
            ...state,
            platforms : action.payload
           
        }


        case 'GET_VIDEOGAMES_BY_NAME' : 

        return{
            ...state,
            videogames : action.payload

        }

        case 'FILTER_CREATED' : 

        const vgAll =[...state.copyAllVideogames]; 
        //console.log(vgAll)

        const createFilter = action.payload === 'Created' ? vgAll.filter( el => el.createdInDb ) : vgAll.filter(el => !el.createdInDb )

        
        return{
            ...state,
            videogames : action.payload === 'All' ? vgAll : createFilter
        }


        case 'ORDER_BY_NAME' :

        const sortName = action.payload === 'asc' ? state.videogames.sort( (prev, next) => {

            if (prev.name.toUpperCase() > next.name.toUpperCase()) {
                //console.log(prev.name.toUpperCase())
                return 1;
            }
            if (prev.name.toUpperCase() < next.name.toUpperCase()) {
                return -1;
            }
            return 0;
        }) 

             :   
                  state.videogames.sort((prev, next)=> {
                if (prev.name.toUpperCase() >  next.name.toUpperCase()) {
                    //console.log(prev.name.toUpperCase())
                    return -1;
                }
                if (prev.name.toUpperCase() < next.name.toUpperCase()) {
                    return 1;
                }
                return 0;
            })

        return {
            ...state,
            videogames : action.payload === 'All' ? state.copyAllVideogames : sortName,
        
        }

        case 'ORDER_BY_RATING' :

        

            const sortRating = action.payload === 'MinRating' ? state.videogames.sort( (prev, next) => {

                if (prev.rating > next.rating) {
                    //console.log(prev.name.toUpperCase())
                    return 1;
                }
                if (prev.rating < next.rating) {
                    return -1;
                }
                return 0;
            }) 
    
                 :   
                      state.videogames.sort((prev, next)=> {
                    if (prev.rating >  next.rating) {
                        //console.log(prev.name.toUpperCase())
                        return -1;
                    }
                    if (prev.rating < next.rating) {
                        return 1;
                    }
                    return 0;
                })
    
            return {
                ...state,
                videogames : action.payload === 'All' ? state.copyAllVideogames : sortRating,
            
            }

            case 'FIlTER_GENRES' : 
            console.log(action.payload)

            console.log(state.videogames)
            
            const allG= [...state.copyAllVideogames]; 
            
            const filterGenres = action.payload === 'All' ?     allG : allG.filter(el => el.genres.includes(action.payload))
            
            return{
                ...state,
                videogames : filterGenres
            }

            case 'POST_VIDEOGAME' : 

            return {
                ...state
            }

            case 'GET_DETAILS' : 
            return {
                ...state , 
                details : action.payload
            }

            case 'CLEAN_DETAIL' : 
                    return{
                        ...state,
                        details : {}
                    }
            
        default:
            return state
    }


}

export default rootReducer