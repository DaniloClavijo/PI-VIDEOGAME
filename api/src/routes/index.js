const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Videogame, Genre } = require('../db');
const db = require('../db')



const router = Router();

const {API_KEY} = process.env

//console.log(API_KEY)

const apiGames = 'https://api.rawg.io/api/games?key=';

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


    // https://api.rawg.io/api/games?key=16f3cdcebbae4033900deb657bb91a91
    // ese endpoint me devuelve un array de 20 videoJuegos, necesito 100, como hago? 
    //${api}${API_KEY}&page=2 serian otros 20 videojuegos pero de la pagina 2 
    // &page_size = numero de resultados por pagina 
    //&page = numero de pagina

    //1ra solucion : sabiendo que, cuando tengo esto page=1 me va a devolver un result con 20 videojuegos y toda su info, lo que puedo hacer es un for donde su i sea el numero de paginas , por lo tanto si hacemos 1>=5 tendre 5 paginas en total , 5 paginas * 20 videojuegos me daria 100 videojuegos, cada pagina la podria guardar en un array


    // 1er endpoint me trae todos los videojuegos https://api.rawg.io/api/games/key=16f3cdcebbae4033900deb657bb91a91
    // 2do enpodint GET https://api.rawg.io/api/games?search={game}/?key=16f3cdcebbae4033900deb657bb91a91
    //3ro https://api.rawg.io/api/genres?key=16f3cdcebbae4033900deb657bb91a91

    //4to https://api.rawg.io/api/games/1?key=16f3cdcebbae4033900deb657bb91a9

//*************1ro)********Creo una funcion en la cual me traiga toda la info de la api (100 videojuegos) 1er endPOINT ******************//
const getInfoApi = async () => {

    try {
        
        const infoApi = []
        

        for (let i = 1; i <=5; i++) {
            
            const apiUrl = await axios.get(`${apiGames}${API_KEY}&page=${i}`);

            // para i = 1 tengo la pagina 1 

            const infoApiMap =  apiUrl.data.results.map(el =>{

                const infoClean = {

                    
                    id : el.id,
                    name : el.name, 
                    image : el.background_image,
                    genres : el.genres.map(el => el.name),
                    rating : el.rating,
                    platforms : el.platforms.map(el => el.platform.name),
                    released : el.released,
                }

                infoApi.push(infoClean)

            })          
        }
        //console.log(infoApi.length)
        
        //******tendre un array de esta forma con 100 objetos que seran los videojuegos ********//

            // [
            //     {                    
            //         id : el.id,
            //         name : el.name, 
            //         image : el.background_image,
            //         genres : el.genres.map(el => el.name),
            //         rating : el.rating,
            //         platforms : el.platforms.map(el => el.platform.name),
            //         released : el.released,
            //     }
            // ]

            
            //console.log('ESTO ES LO QUE ME DEVUELVE LA FUNCION (getInfoApi) ' ,infoApi.length)

        return infoApi

    } catch (error) {   
        console.log(error)
        
    }
}
//***********2do)**********Creo una funcion en la cual me traiga toda la info de la base de datos ( caso que haya algo creado traera algo, si no no traera nada) //

const getInfoDb = async function () {  

    try{
    const dbInfo = await Videogame.findAll({
        include: 
            {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }   
        })

        const dbInfoMap =  dbInfo.map( el => {

            return {
                id : el.id,
                name : el.name, 
                image : el.image,
                genres : el.genres.map(el => el.name),
                rating : el.rating,
                platforms : el.platforms,
                released : el.released,
                description : el.description,
                createdInDb : el.createdInDb
            }
        })


         //console.log('ESTO ES LA INFO DE LA DATABASE' , dbInfoMap)
    return dbInfoMap
}catch(error){
    console.log(error)
}
}


//***********3do)**********Creo una funcion en la cual me una toda la info de la base de datos y la de la api y me la devuelva toda unida //


const getAllVideoGames = async () => {
    try{

        const apiInfo = await getInfoApi() ; 
        const dBInfo = await getInfoDb() ; 

        // en esas dos constantes tengo la info de la api y la info de la db 

        /* *********** */

        // ahora hago una variable en la cual guarde esas dos informaciones en una sola 

        const infoTotal = dBInfo.concat(apiInfo)
        // esta constante tendra todo, me devolvera un arreglo con la dbInfo y la apiInfo juntas 
        //console.log('ESTO ES LA INFO de todo Concatenado')
        return infoTotal
    }catch(error){
        console.log(error)
    }
}

//*************4to)********Creo una funcion en la cual me traiga toda las plataformas de los videogame)******************//

const getPlataforms = async() => {


    const allinfo = await getInfoApi();

    const allPlatforms = allinfo.map( el => el.platforms)

    //console.log(allPlatforms.join(''))
    return allPlatforms.join().split(',')

   

    //console.log(allPlatforms)
     
};


// ****************************** ROUTAS Get/platforms ******************************

router.get('/platforms',async (req,res) => {

    try {


        const platforms = await getPlataforms();

        const platformsUnique =[];
    
        for (let i = 0; i < platforms.length; i++) {
            
            // una manera de hacer que solo en mi array se guarden los que no esten repetidos es preguntar si ese array ya tiene lo que esta en la posicion i en determinado ciclo 
            const plataformas = platforms[i]; // generos va a valer lo que tiene ese array en equis posicion 
    
            if(!platformsUnique.includes(platforms[i])){
                platformsUnique.push(plataformas)
            }
        }

        res.send(platformsUnique);

        
    } catch (error) {
        console.log(error)
        
    }

})


// ****************************** ROUTAS Get/videogames  ||  Get/videogames?name=algunNombre : ******************************
router.get('/videogames', async (req,res) => {

    try {

        const {name} = req.query ; 

        let TotalVgs = await getAllVideoGames()  ; 

        

        if(name){
            // requisito traer solamente los 15 videojuegos que coincidan con el nombre pasado por query uso un slice, ya que los videojuegos estan son objetos guardados en la posicion de un array . puedo decirle que me traiga desde que si encuentra , solo me traiga 15... 

            let VgTitle =  TotalVgs.filter( el => el.name.toLowerCase().includes(name.toLowerCase())).slice(0,15)
            

            VgTitle.length ? res.status(200).json(VgTitle) : res.status(400).send('No se encuentran resultados que coincidan con ese nombre de Videojuego!')    
        }
        else{
            res.status(200).json(TotalVgs)  
        }
        
    } catch (error) {
        console.log(error)
    }

})

// ****************************** ROUTAS Get/videogame/{idVideogame} : ******************************

// hago un get a esa routa ya que en esa routa se encuentra la description de el videojuego 
// debo tener en cuenta que debo devolver la description , por lo tanto debo para esta routa devolver un nuevo array con objetos, donde contenga lo que debo mostrar en la routa principal + la description del videojuego.

// tambien debo tener en cuenta que si es creada en la base de datos, esta tendra una prop llamada description , que es donde el usuario pondra la descripcion del videogame a crear, por lo cual solo debo devolver la info de la db ... cuando el usuario busca un id ( Sabiendo que nuestro UUID sera algo especial, una combinacion de letras y numeros separadas por un guion)algo como esto id = 3377b6cb-e9f1-4b25-b6b7-fcee43caca74


router.get('/videogames/:idVideogame' , async (req,res,next)=> {
    
 try {
     
 
    const {idVideogame} = req.params;
    const allInfoApiById = []

    //console.log(idVideogame)

    // me traigo toda la info, dataBase y api por si no me pasan algo por paramas 
    const allVideogames = await getAllVideoGames()
    const infoApiById = await getInfoDb(); // me traigo todo de la base de datos 


    if(idVideogame){
    if(idVideogame.includes("-")){

            const findDbId = allVideogames.filter( el => el.id == idVideogame)

            findDbId.length ? res.status(200).json(findDbId) : res.status(404).send('No existe ningun videojuego con ese Id!')
         }     
        // caso en el cual el id que pasen no tenga incluya un '-' singifica que estan buscando un id de la api
       else{

            // recordar que para este caso debo mostrar varios detalles del videojuego entre ellos el detalle de la description , por lo tanto no me servira traerme la info de la api anteriormente organizada, ya que este arreglo no tiene una prop con description 

            const infoApiById = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=16f3cdcebbae4033900deb657bb91a91`);

            allInfoApiById.push(infoApiById.data)

            //console.log(infoApiById)

            const allInfoMap =  allInfoApiById.map(el => {

                return  {                  
                    id : el.id,
                    name : el.name, 
                    image : el.background_image,
                    genres : el.genres.map(el => el.name),
                    rating : el.rating,
                    platforms : el.platforms.map(el => el.platform.name),
                    released : el.released,
                    description : el.description
                }              
            })   
            
            // una vez que tengo todo en allInfoMap dentro de ese array debo filtrar el id que pasan 

            
            const filterArr = allInfoMap.filter(el => el.id == idVideogame)

            filterArr.length ? res.status(200).json(filterArr) : res.status(404).send('no existe ningun videojuego con ese id, Prueba otra vez ') // si recibe un string 'sad'  si me toma el codigo 404
       /*      if(filterArr.length){
                res.status(200).json(filterArr)
            }else {
                res.status(404).send('no existe ningun videojuego con ese id, Prueba otra vez ') // si recibe un string 'sad'  si me toma el codigo 404
            } */
      }
    
 } else {
        res.status(200).json(allVideogames)
    }  
} catch (error) {

  console.log(error)
     
}    
})

// ****************************** ROUTAS Get/ : ******************************

router.get('/genres' , async (req,res)=>{

    //Obtener todos los tipos de géneros de videojuegos posible

    const infoApi = await getInfoApi();

    const getGenres = infoApi.map( el => el.genres)
    //res.json(getGenres)


    // obtengo un array donde cada posicion sera un array con varios generos separados por coma. 

    // lo que hago es transformar todo ese array a un string con un .join 
    var arrGenres = getGenres.join().split(',')
    // despues lo que hago es volver a unirlos pero por coma en un array obteniendo un array de generos [algo, algo , uno , uno , dos , etc ]
    // voy a hacer un for para obtener o digamoslo asi eliminar los generos repetidos y tener un array de generos solamente. 

    
    const uniQue =[];
    
    for (let i = 0; i < arrGenres.length; i++) {
        
        // una manera de hacer que solo en mi array se guarden los que no esten repetidos es preguntar si ese array ya tiene lo que esta en la posicion i en determinado ciclo 
        const generos = arrGenres[i]; // generos va a valer lo que tiene ese array en equis posicion 

        if(!uniQue.includes(arrGenres[i])){
            uniQue.push(generos)
        }          
    }

    // bueno ya tengo todos los generos de la api (sin repetir ningun genero ) guardados en una variable( uniQue )ahora lo que debo hacer es guardarlos en mi base de datos llamada Genre 

    // tengo que guardar cada nombre en mi entidad genres en la posicion name .. como hago ? bueno puedo usar un forEach( el => {donde cada elemento sea un valor de mi name en mi entidad })


    uniQue.forEach( el => {
        Genre.findOrCreate({

            where : { name : el}
        })
    })


    // listo lo que acabo de hacer es guardarlo en la base de datos , los traje de la api , y los guarde en la base de datos 

    // esta routa los va a devolver, por lo tanto debo traermelos pero de la base de datos 

    const allGenres = await Genre.findAll() ; // me acabo de traer todo lo que tiene mi modelo Genre ... ahora solo debo devolverlo y ya . 

    

     res.status(200).json(allGenres)
     
})


// ****************************** ROUTAS post/videogame : ******************************

// va a recibir los datos por body(mirar routa de creacion front) y con esos datos debo crear un videojuego en la base de datos 

// recibo por body : nombre,Description,Fecha de lanzamiento , Rating , genero ,plataformas 
router.post('/videogame' , async (req, res) =>{


    try {
        
    
    const {
        name,
        description,
        released,
        rating,
        genres ,  
        platforms, 
        createdInDb,
        image,

         } = req.body;

        const VideogameCreate = await Videogame.create({

        name,
        description,
        released,
        rating,
        //genres ,  *** el usuario la busca en la base de datos y elije por lo tanto lo que hago es cuando se crea el videojuego, le paso los valores pero de la base de datos .
        //platforms, *** el usuario la busca en la base de datos y elije 
        platforms,
        createdInDb,
        image,

        })
        // primero me traigo todo los generos de la base de datos y los guardo en una variable para asi poder pasarselos a la variable donde me creo el videogame 

        let genreDb = await Genre.findAll({
            where : { name : genres} // ese genres sera lo que le pasen por body, si hace match con la base de datos lo tendra como propiedad .. accionPerBody === accionFromDb
        })

        VideogameCreate.addGenre(genreDb)
        res.send('Tu Videojuego ha sido Creado con exito!')

    } catch (error) {
        console.log(error)
        
    }
})


module.exports = router;
