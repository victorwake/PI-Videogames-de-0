import "./create.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlatforms, cleanAllFilters, getGenres, getGames } from "../../redux/action";
// import { Footer } from "../footer/Footer";
import { Nav } from "../nav/Nav";
import { useNavigate } from "react-router-dom";// es el remplazo de useHistory en react 6
import imgDefault from "../../img/default.jpg";
import { formControl } from '../../helpers/formControl';
import { postGame } from '../../helpers/postGame';

export const CreateGame = () => {
  
  const dispatch = useDispatch();
  const clase = useSelector((store) => store.theme);
  const navigate = useNavigate(); // es el remplazo de useHistory en react 6
  const allGames = useSelector(state => state.allGames);
  const genres = useSelector(state => state.genres);
  const platforms = useSelector(state => state.platforms);
  const [errText, seterrText] = useState({});  

  const [input, setInput] = useState({
    name: '',
    img: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
  });

  //verifico si los componentes ya estan cargados en el store
  if(!allGames.length && !genres.length && !platforms.length) {
    dispatch(getGames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    seterrText(formControl({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleSelectGenre = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    seterrText(formControl({
      ...input,
      genres: [...input.genres, e.target.value],
    }));
  };

  const handleSelectPlatform = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
    seterrText(formControl({
      ...input,
      platforms: [...input.platforms, e.target.value],
    }));
    
  };

const deleteChoice = (category, value) => {
  const newValues = input[category].filter((e) => e !== value);
  setInput({
    ...input,
    [category]: newValues
  })
  seterrText(formControl({
    ...input,
    [category]: newValues
  }));
};

const handleSubmit = e => {
  e.preventDefault();
  if(!input.img.length) input.img = imgDefault
  postGame(input);
  dispatch(cleanAllFilters());
  dispatch(getGames());
  navigate("/setGame"); // es el remplazo de useHistory en react 6
};


const disabled = Object.keys(errText).length || !input.name // para que se pueda mandar tiene que ser false

  return (
    <div className={"create-container-" + clase}>
      <Nav />

      <div>

        <div className={"container-create-" + clase}>


          <form
            onSubmit={handleSubmit}
            className={"container-create-form-" + clase}
          >

            <div className={"container-create-title-" + clase}>
              <h3 className={"title-create-" + clase}>
                🎮 Create your own video game! 🎮
              </h3>
            </div>




            <div className="containerCreateBody">
              <div className="columnsForm">
                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Name:</label>
                  <input
                    className={"inputName-" + clase}
                    autoComplete="off"
                    type="text"
                    maxLength="30"
                    name='name' value={input.name}
                    onChange={handleChange}
                  />
                  {errText.name && <span className="fontErrorsCreate" >》》 {errText.name}</span>}
                </div>
                <br />




                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Description:</label>
                  <textarea
                    className={"inputDescription-" + clase}
                    autoComplete="off"
                    type="text"
                    maxLength="500"
                    name='description' value={input.description} 
                    onChange={handleChange}
                  ></textarea>
                  {errText.description && <span  className='fontErrorsCreate'>》》 {errText.description}</span>}
                </div>
                <br />





                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Genres:</label>
                  <select
                    id="selectGenreCreate"
                    name="genres"
                    value={input.genres}
                    defaultValue="select"
                    onChange={(e) => handleSelectGenre(e)}
                  >
                    <option value="select" disabled="" hidden="" selected="">
                      Select...
                    </option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.name}>{genre.name}</option>))}
                  </select>

                  <div className="containerListCreateG">
                    <div>
                      {input.genres.map((genre, i) => {
                        if (i < 7)
                          return (
                            <div key={i} className={"list-create-" + clase}>
                              <div>
                                <span className={"span-create-" + clase}>
                                  {genre}
                                </span>
                                <button
                                  type="button"
                                  className={"button-delete-db-" + clase}
                                  onClick={() => deleteChoice("genres", genre)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          );
                        return <div></div>;
                      })}
                    </div>
                    <div>
                      {input.genres.length >= 8 &&
                        input.genres.map((genre, i) => {
                          if (i >= 7 && i < 14)
                            return (
                              <div key={i} className={"list-create-" + clase}>
                                <span className={"span-create-" + clase}>
                                  {genre}
                                </span>
                                <button
                                  type="button"
                                  className={"button-delete-db-" + clase}
                                  onClick={() => deleteChoice("genres", genre)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          return <div></div>;
                        })}
                    </div>
                    <div>
                      {input.genres.length >= 15 &&
                        input.genres.map((genre, i) => {
                          if (i >= 14)
                            return (
                              <div key={i} className={"list-create-" + clase}>
                                <span className={"span-create-" + clase}>
                                  {genre}
                                </span>
                                <button
                                  type="button"
                                  className={"button-delete-db-" + clase}
                                  onClick={() => deleteChoice("genres", genre)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          return <div></div>;
                        })}
                    </div>
                    
                  </div>
                  {errText.genres && (
                      <span className="fontErrorsCreate"> 》》 {errText.genres}</span>
                    )}
                </div>
              </div>






              <div class="columnsForm">
                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Release date:</label>
                  <input
                    className={"inputRelease-"+ clase}
                    type="date"
                    name='released' value={input.released}
                    onChange={handleChange}
                  />
                  {errText.released && <span  className="fontErrorsCreate">》》 {errText.released}</span>}
                </div>
                <br />







                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Rating:</label>
                  <input
                    className={"inputRating-" + clase}
                    autoComplete="off"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating" value={input.rating} 
                    onChange={handleChange}
                  />
                  {errText.rating && <span className="fontErrorsCreate" >》》 {errText.rating}</span>}
                </div>
                <br />




                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Image URL:</label>
                  <input
                    className={"inputImgURL-" + clase}
                    autoComplete="off"
                    type="text"
                    placeholder= 'url...'
                    name='img' value={ input.img }
                    onChange={handleChange}
                  />
                </div>
                {errText.img && <span  className='redspan'>》》 {errText.img}</span>}
                <br />









                <div>
                  <label id="fontBodyCreate" className={"block-create-" + clase}>Platforms:</label>
                  <select
                    className="selectPlatformCreate"
                    name="platforms"
                    value={input.platforms}
                    onChange={(e) => handleSelectPlatform(e)}
                  >
                    <option value="select" disabled="" hidden="" selected="">
                      Select...
                    </option>
                    {platforms.map((platform) => (
                      <option key={platform.id} value={platform.name} disabled="" hidden="" selected="">{platform.name}</option>))}
                  </select>

                  <div class="containerListCreate">
                  <div className="containerListCreateP">
                    <div>
                      {input.platforms.map((platform, i) => {
                        if (i < 7)
                          return (
                            <div key={i} className={"list-create-" + clase}>
                              <div>
                                <span className={"span-create-" + clase}>
                                  {platform}
                                </span>
                                <button
                                  type="button"
                                  className={"button-delete-db-" + clase}
                                  onClick={() => deleteChoice("platforms", platform)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          );
                        return <div></div>;
                      })}
                    </div>
                    <div>
                      {input.platforms.length >= 8 &&
                        input.platforms.map((platform, i) => {
                          if (i >= 7 && i < 14)
                            return (
                              <div key={i} className={"list-create-" + clase}>
                                <span className={"span-create-" + clase}>
                                  {platform}
                                </span>
                                <button
                                  type="button"
                                  className={"button-delete-db-" + clase}
                                  onClick={() => deleteChoice("platforms", platform)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          return <div></div>;
                        })}
                    </div>
                    <div>
                      {input.platforms.length >= 15 &&
                        input.platforms.map((platform, i) => {
                          if (i >= 14)
                            return (
                              <div key={i} className={"list-create-" + clase}>
                                <span className={"span-create-" + clase}>
                                  {platform}
                                </span>
                                <button
                                  type="button"
                                  className={"button-delete-db-" + clase}
                                  onClick={() => deleteChoice("platforms", platform)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          return <div></div>;
                        })}
                    </div>

                  </div>
                  </div>
                  {errText.platforms && (
                    <span className="fontErrorsCreate">》》 {errText.platforms}</span>
                  )}
                </div>
              </div>
            </div>


            <div class="containerButtonCreate">
              <button
                type="submit"
                value='Create'
                disabled={disabled}
                className={"create-disable-" + clase}
              >
                Create
              </button>


            </div>
          </form>
        </div>
      </div>




    <div class="footer-create">
    </div>
    </div>
  );
};
