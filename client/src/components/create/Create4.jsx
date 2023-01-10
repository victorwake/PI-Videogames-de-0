// <!-- <div>
//   <div class="containerCreate">
//     <form class="containerForm">
//       <div class="containerCreateTitle">
//         <h3 class="titleCreate">🎮 Create your own video game! 🎮</h3>
//       </div>
//       <div class="containerCreateBody">
//         <div class="columnsForm">
//           <div>
//             <label class="fontBodyCreate blockCreate">Name: </label>
//             <input name="name" class="inputName" autocomplete="off" value="" />
//           </div>
//           <br />
//           <div>
//             <label class="fontBodyCreate blockCreate">Description: </label>
//             <textarea
//               name="description"
//               class="inputDescription"
//               autocomplete="off"
//             >
//             </textarea>
//           </div>
//           <br />
//           <div>
//             <label class="fontBodyCreate blockCreate">Genres: </label>
//             <select id="selectGenreCreate" name="genres">
//               <option value="select" disabled="" hidden="" selected="">
//                 Select...
//               </option>
//             </select>
//             <div class="containerListCreate">
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//           </div>
//         </div>
//         <div class="columnsForm">
//           <div>
//             <label class="fontBodyCreate blockCreate">Release date: </label>
//             <input
//               name="released"
//               class="inputRelease"
//               autocomplete="off"
//               value=""
//             />
//           </div>
//           <br />
//           <div>
//             <label class="fontBodyCreate blockCreate">Rating: </label>
//             <input
//               type="number"
//               step="0.1"
//               name="rating"
//               class="inputRating"
//               autocomplete="off"
//               value=""
//             />
//           </div>
//           <br />
//           <div>
//             <label class="fontBodyCreate blockCreate">Image URL: </label>
//             <input
//               name="image"
//               class="inputImgURL"
//               autocomplete="off"
//               value=""
//             />
//           </div>
//           <br />
//           <div>
//             <label class="fontBodyCreate blockCreate">Platforms: </label>
//             <select name="platforms">
//               <option value="select" disabled="" hidden="" selected="">
//                 Select...
//               </option>
//               <option value="Android">Android</option>
//               <option value="Game Boy">Game Boy</option>
//               <option value="GameCube">GameCube</option>
//               <option value="iOS">iOS</option>
//               <option value="Nintendo 64">Nintendo 64</option>
//               <option value="Nintendo DS">Nintendo DS</option>
//               <option value="Nintendo Switch">Nintendo Switch</option>
//               <option value="PC">PC</option>
//               <option value="PlayStation">PlayStation</option>
//               <option value="PlayStation 2">PlayStation 2</option>
//               <option value="PlayStation 3">PlayStation 3</option>
//               <option value="PlayStation 4">PlayStation 4</option>
//               <option value="PlayStation 5">PlayStation 5</option>
//               <option value="PSP">PSP</option>
//               <option value="SEGA">SEGA</option>
//               <option value="Wii">Wii</option>
//               <option value="Xbox">Xbox</option>
//               <option value="Xbox 360">Xbox 360</option>
//               <option value="Xbox One">Xbox One</option>
//               <option value="Xbox Series S/X">Xbox Series S/X</option>
//             </select>
//             <div class="containerListCreate">
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="containerButtonCreate">
//         <button type="submit" disabled="" class="createDisabled">Create</button>
//       </div>
//     </form>
//   </div>
// </div> -->

import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
// import { Redirect } from 'react-router-dom';
import { getVideogamesFromDB, setLoadingVideogamesDB } from "../../redux/action";
import { Nav } from "../nav/Nav";
import './create2.css'

export const CreateGame = () => {

   const genres = useSelector(state => state.genres)
   const clase = useSelector((store) => store.theme);
   
   const platforms = ["Android", "Game Boy", "GameCube", "iOS", "Nintendo 64", "Nintendo DS", "Nintendo Switch", "PC", "PlayStation", "PlayStation 2",
   "PlayStation 3", "PlayStation 4", "PlayStation 5", "PSP", "SEGA", "Wii", "Xbox", "Xbox 360", "Xbox One", "Xbox Series S/X"]

   const [input, setInput] = useState({
      name: '',
      img: '',
      description: '',
      released: '',
      rating: '',
      genres: [],
      platforms: [],
   });

   const [errors, setErrors] = useState({});
   
   const [redirect, setRedirect] = useState(false);

   const handleInputChange = e => {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
      setErrors(validate({
         ...input,
         [e.target.name]: e.target.value
      }));
   }

   const handleSelectChange = e => {
      const selected = input[e.target.name]
      if (!selected.includes(e.target.value)) {
         selected.push(e.target.value)
         setInput({
            ...input,
            [e.target.name]: selected
         })
         setErrors(validate({
            ...input,
            [e.target.name]: selected
         }));
      }
   }
   
   const deleteChoice = (category, value) => {
      const newValues = input[category].filter(e => e !== value)
      setInput({
         ...input,
         [category]: newValues
      })
      setErrors(validate({
         ...input,
         [category]: newValues
      }))
   }

   const dispatch = useDispatch()

   const handleSubmit = e => {
      e.preventDefault();
      axios.post('/videogame', input)
      .then(res => {
         if (res.status === 201) {
            dispatch(setLoadingVideogamesDB(true))
            dispatch(getVideogamesFromDB())
            alert('Videogame created successfully')
            setRedirect(true)
         }
      })
      .catch(error => alert(error.message))
   }

   const validate = input => {
      let errors = {};
      if (!input.name) errors.name = 'Name is required'
      else if (!/^[^@#$%^&]+$/.test(input.name)) errors.name = 'Name must not contain special characters (@#$%^&)'
      if (!input.description) errors.description = 'Description is required'
      if (!input.genres.length) errors.genres = 'You must select at least one genre'
      if (input.released && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)) errors.released = 'Release date must be in the format yyyy-mm-dd'
      if (input.rating < 0 || input.rating > 5) errors.rating = 'Rating must be a number between 0 and 5';
      if (input.img && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)) errors.img = "Image URL must have a valid URL format (http/https/ftp)"
      else if (input.img && !/(\.|=)(jpg|png|gif)$/i.test(input.img)) errors.img = "Image URL must have a valid image format (jpg/png/gif)"
      if (!input.platforms.length) errors.platforms = 'You must select at least one platform'
      return errors;
   };

   const disabled = Object.keys(errors).length || !input.name
   
   // if (redirect) return <Redirect to='/home' />

   return (
      <div className='backgroundCreate'>
         <br></br>
         <Nav />
         <div className='containerCreate'>
            <form onSubmit={handleSubmit} className='containerForm'>
               <div className='containerCreateTitle'>
                  <h3 className='titleCreate'>&#127918; Create your own video game! &#127918;</h3>
               </div>
               <div className='containerCreateBody'>
                  <div className='columnsForm'>
                     <div>
                        <label className='fontBodyCreate blockCreate'>Name: </label>
                        <input
                           name="name"
                           value={input.name}
                           className='inputName'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.name && (<span className='fontErrorsCreate'>{errors.name}</span>)}
                     </div>
                     <br></br>
                     
                     <div>
                        <label className='fontBodyCreate blockCreate'>Description: </label>
                        <textarea
                           name="description"
                           value={input.description}
                           className='inputDescription'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.description && (<span className='fontErrorsCreate'>{errors.description}</span>)}
                     </div>
                     <br></br>
                     
                     <div>
                        <label className='fontBodyCreate blockCreate'>Genres: </label>
                        <select defaultValue="select" id="selectGenreCreate" name="genres" onChange={handleSelectChange}>
                           <option value="select" disabled hidden>Select...</option>
                           {genres.map((genre) => (
                              <option key={genre.id} value={genre.name}>{genre.name}</option>
                           ))}
                        </select>
                        <div className='containerListCreate'>
                           <div>
                              {input.genres.map((genre, i) => {
                                 if (i < 7) return (
                                    <div key={i} className='listCreate'>
                                       <span className='fontBodyCreate fontWeightLight'>{genre}</span>
                                       <button type="button" className='eraseCreate' onClick={() => deleteChoice("genres", genre)}>X</button>
                                    </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.genres.length >= 8 && input.genres.map((genre, i) => {
                                 if (i >= 7 && i < 14) return (
                                 <div key={i} className='listCreate'>
                                    <span className='fontBodyCreate fontWeightLight'>{genre}</span>
                                    <button type="button" className='eraseCreate' onClick={() => deleteChoice("genres", genre)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.genres.length >= 15 && input.genres.map((genre, i) => {
                                 if (i >= 14) return (
                                 <div key={i} className='listCreate'>
                                    <span className='fontBodyCreate fontWeightLight'>{genre}</span>
                                    <button type="button" className='eraseCreate' onClick={() => deleteChoice("genres", genre)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                        </div>
                        {errors.genres && (<span className='fontErrorsCreate'>{errors.genres}</span>)}
                     </div>
                  </div>
                  
                  <div className='columnsForm'>
                     <div>
                        <label className='fontBodyCreate blockCreate'>Release date: </label>
                        <input
                           name="released"
                           value={input.released}
                           className='inputRelease'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.released && (<span className='fontErrorsCreate'>{errors.released}</span>)}
                     </div>
                     <br></br>

                     <div>
                        <label className='fontBodyCreate blockCreate'>Rating: </label>
                        <input
                           type="number"
                           step="0.1"
                           name="rating"
                           value={input.rating}
                           className='inputRating'
                           onChange={handleInputChange}
                           autoComplete="off"
                        />
                        {errors.rating && (<span className='fontErrorsCreate'>{errors.rating}</span>)}
                     </div>
                     <br></br>

                     <div>
                        <label className='fontBodyCreate blockCreate'>Image URL: </label>
                        <input
                           name="image"
                           value={input.img}
                           className='inputImgURL'
                           onChange={handleInputChange}
                           autoComplete="off"
                           />
                        {errors.img && (<span className='fontErrorsCreate'>{errors.img}</span>)}
                     </div>
                     <br></br>
                     
                     <div>
                        <label className='fontBodyCreate blockCreate'>Platforms: </label>
                        <select defaultValue="select" name="platforms" onChange={handleSelectChange}>
                           <option value="select" disabled hidden>Select...</option>
                           {platforms.map((platform, i) => (
                              <option key={i} value={platform}>{platform}</option>
                           ))}
                        </select>
                        <div className='containerListCreate'>
                           <div>
                              {input.platforms.map((platform, i) => {
                                 if (i < 7) return (
                                    <div key={i} className='listCreate'>
                                       <span className='fontBodyCreate fontWeightLight'>{platform}</span>
                                       <button type="button" className='eraseCreate' onClick={() => deleteChoice("platforms", platform)}>X</button>
                                    </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.platforms.length >= 8 && input.platforms.map((platform, i) => {
                                 if (i >= 7 && i < 14) return (
                                 <div key={i} className='listCreate'>
                                    <span className='fontBodyCreate fontWeightLight'>{platform}</span>
                                    <button type="button" className='eraseCreate' onClick={() => deleteChoice("platforms", platform)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                           <div>
                              {input.platforms.length >= 15 && input.platforms.map((platform, i) => {
                                 if (i >= 14) return (
                                 <div key={i} className='listCreate'>
                                    <span className='fontBodyCreate fontWeightLight'>{platform}</span>
                                    <button type="button" className='eraseCreate' onClick={() => deleteChoice("platforms", platform)}>X</button>
                                 </div>
                                 )
                                 return <div></div>
                              })}
                           </div>
                        </div>
                        {errors.platforms && (<span className='fontErrorsCreate'>{errors.platforms}</span>)}
                     </div>
                  </div>
               </div>
               <div className='containerButtonCreate'>
                  <button type="submit" disabled={disabled} className={disabled ? 'createDisabled' : 'createActive'}>Create</button>
               </div>
               </form>
            </div>
      </div>
   );
};
