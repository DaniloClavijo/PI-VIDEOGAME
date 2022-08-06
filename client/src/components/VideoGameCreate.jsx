import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllPlatforms, postVideogame } from "../actions";
import styleCV from './VideoGameCreate.module.css'

//funcion validadora para hacer el formulario controlado

const validate = (input) => {
  var errors = {}

  if (!input.name) {

    errors.name = 'Name is required';
  }
  if (!input.image) {
    errors.image = 'Image is Required'
  }

  if (!input.released) {
    errors.released = 'Released is required'
  }
  if (!input.rating) {
    errors.rating = 'Rating is required'
  }
  if (!input.description) {
    errors.description = 'Description is required'
  }
  if (!input.platforms) {
    errors.platforms = 'Platforms is required'
  }
  return errors;
}




export default function VideogameCreate() {

  const dispatch = useDispatch();

  const genres = useSelector((state) => state.allGenres)
  const platforms = useSelector((state) => state.platforms)

  useEffect(() => {
    dispatch(getAllGenres())
    dispatch(getAllPlatforms());
  }, [dispatch]);

  // const [errors,setErrors] = useState({})

  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    image: "",

  });

  const [errors, setErrors] = useState({

    name: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
    image: '',


  })



  // funcion que se encarga de manejar y atrapar todos los input y guardarlos en el estado local 

  function handleChangeInput(e) {

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    console.log(input)

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value

    }))

  }

  function handleSelectOptionsGenres(e) {

    setInput({
      ...input, // todo lo que ya tenia mi estado input 
      genres: [...input.genres, e.target.value],
      // en la prop de el estado input llamada temperament le voy a pasar como valor lo que ya tenia el estado input.temperament en esa prop + lo que el usuario va a ir seleccionando como opcion. lo que hara es ir cargando en ese array cada opcion seleccionada por el usuario 
    })

    console.log(input)

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value

    }))
  }

  function handleSelectOptionsPlatforms(e) {

    setInput({
      ...input, // todo lo que ya tenia mi estado input 
      platforms: [...input.platforms, e.target.value]
      // en la prop de el estado input llamada temperament le voy a pasar como valor lo que ya tenia el estado input.temperament en esa prop + lo que el usuario va a ir seleccionando como opcion. lo que hara es ir cargando en ese array cada opcion seleccionada por el usuario 

    })

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value

    }))

    console.log(input)
  }

  function handleSubmit(e) {

    e.preventDefault()


    if (!input.name || !input.description || !input.platforms || !input.image || !input.released || !input.genres || !input.rating) {
      e.preventDefault()
      alert('completa todos los datos requeridos para poder crear tu videojuego!')

    } else {


      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        Image: '',

      })
      dispatch(postVideogame(input))
      alert('tu videojuego se ha creado con exito ')

      // una vez que se le envia la informacion por body al back y se cree el videogame , quiero que me lleve a la pagina home para ver todos los videojuegos

      history.push('/home');

    }
  }
  function handleDeleteGenres (el){
   setInput({
     ...input, 
     genres : input.genres.filter(tem => tem !== el)

   })
  }


  return (

    <div className={styleCV.background}>
      <Link to="/home">
        <button className={styleCV.btn1} >VOLVER</button>
      </Link>
      <h1 className={styleCV.titulo
      }>Crear tu propio Videojuego</h1>

      <form className={styleCV.todo} onSubmit={e => handleSubmit(e)}>


        <div className={styleCV.cuadro
        }>
          <label>Nombre : </label>
          <input className={styleCV.input}
            type="text"
            placeholder="ingrese un nombre"
            value={input.name}
            name="name"
            onChange={e => handleChangeInput(e)}
          />

          {
            errors.name && (<span className="danger">{errors.name}</span>)
          }
        </div>


        <div className={styleCV.cuadro
        }>
          <label>Descripcion :   </label>
          <input className={styleCV.input}
            type="text"
            placeholder="descripcion"
            value={input.description}
            name="description"
            onChange={e => handleChangeInput(e)}
          />
          {
            errors.description && (<span className="danger">{errors.description}</span>)
          }


        </div>


        <div className={styleCV.cuadro
        }>
          <label>Fecha De lanzamiento : </label>
          <input className={styleCV.input}
            type="date"
            placeholder="date"
            value={input.released}
            name="released"
            onChange={e => handleChangeInput(e)}
          />

          {
            errors.released && (<span className="danger">{errors.released}</span>)
          }
        </div>


        <div className={styleCV.cuadro
        }>
          <label>Rating : </label>
          <input className={styleCV.input}
            type="number"
            step="0.1"
            min="0" max="5"
            placeholder="rating"
            value={input.rating}
            name="rating"
            onChange={e => handleChangeInput(e)}

          />

          {
            errors.rating && (<span className="danger">{errors.rating}</span>)
          }
        </div>

        <div className={styleCV.cuadro
        }>
          <label>Imagen : </label>
          <input className={styleCV.input}
            type="text"
            placeholder="ingrese una Imagen"

            name="image"
            onChange={e => handleChangeInput(e)}

          />

          {
            errors.image && (<span className="danger">{errors.image}</span>)
          }
        </div>

        {/*  {<div >
                    <label>
                        {genres.map((e, index) => { 
                            return (
                            <div key = {e}>
                                <span>{e}</span>
                             <input type="checkbox" 
                             name = {e} 
                             value = {index + 1} 
                            />
                             </div>
                        )})}
                     </label>
         </div>} */}

        {<div className={styleCV.cuadro
        }>

          <label>elije los generos :  </label>
          <select className={styleCV.select
          } onChange={e => handleSelectOptionsGenres(e)}>
            {
              genres.map(t => (

                <option value={input.t} key={t}>{t} </option>
              ))
            }

          </select>
          {
            < div >
              <label>
                {input.genres.map((e, index) => {
                  return (
                    <div key={e}>
                      <li>{e}</li>
                      <input type="checkbox"
                        name={e}
                        value={index+1}
                        checked='true'
                      /> <p>deseas borrar el genero {e}?</p>
                      <button onClick={ () => handleDeleteGenres (e)}>X</button>
                    </div>
                  )
                })}
              </label>
            </div>
          }

        </div>}

        {
          <div className={styleCV.cuadro
          }>

            <label>elije las plataformas : </label>
            <select className={styleCV.select} onChange={e => handleSelectOptionsPlatforms(e)}>
              {
                platforms.map(p => (

                  <option value={input.p} key={p}>{p} </option>

                ))


              }

            </select>

          </div>
        }

        <button className={styleCV.btn} type='submit' > Crea Tu Videogame </button>




      </form >

      {/* esto me puede servir para eliminar alguna plataforma que el usuario eligio por equivocacion   */}
      {/* {input.platforms.map(el => 
             <div>

               <p>{el}</p>

               <button onClick={ () => handleDeletePlatforms (el)}>X</button>

             </div>
           )} */}
    </div >
  );
}