import "./create.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postGame, getPlatforms, getGenres, getGames } from "../../redux/action";
import { Footer } from "../footer/Footer";
import { Nav } from "../nav/Nav";
import { useNavigate } from 'react-router-dom';
import imgDefault  from '../../img/default.jpg'

export const CreateGame = () => {
  const dispatch = useDispatch();
  const clase = useSelector((store) => store.theme);
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const navigate = useNavigate(); // es el remplazo de useHistory en react 6

  const [input, setInput] = useState({
    name: "",
    img: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    description: "",
  });

  useEffect(() => {
    if (!platforms.length) dispatch(getPlatforms());
    if (!genres.length) dispatch(getGenres());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectGenre = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };

  const handleSelectPlatform = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!input.img) input.img = imgDefault;
    dispatch(postGame(input));
    dispatch(getGames());

    setInput({
      name: "",
      img: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
      description: "",
    });
    navigate('/home')// es el remplazo de useHistory en react 6
  };




  return (
    <div className={"create-container-" + clase}>
        <Nav />
        <div className={"create-box-" + clase}>
        <form onSubmit={(e)=> handleSubmit(e)} className={"form-container-" + clase} >
            <div className={"form-box-" + clase} >

                <label className={"label-create-" + clase} >Name:</label>
                <input
                type="text"
                maxLength= '30'
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                />

                <label className={"label-create-" + clase} >Image URL: </label>
                <input
                type="text"
                value={input.img}
                name="img"
                placeholder= 'url...'
                onChange={(e) => handleChange(e)}
                />

                <label className={"label-create-" + clase} >Release date: </label>
                <input
                type="date"
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
                />

                <label className={"label-create-" + clase} >Rating: </label>
                <input
                type="number"
                step='0.1'
                min='0'
                max='5'
                value={input.rating}
                name="rating"
                onChange={(e) => handleChange(e)}
                />

                <label className={"label-create-" + clase} >Platforms: </label>
                <select
                name="platforms"
                // multiple={true}
                value={input.platforms}
                onChange={(e)=> handleSelectPlatform(e)}
                >
                  
                    {platforms.map((platform) => (
                        <option key={platform.id} value={platform.name}>{platform.name}</option>
                    ))}
                </select>

                <label className={"label-create-" + clase} >Genres: </label>
                <select
                name="genres"
                // multiple={true}
                value={input.genres}
                onChange={(e) => handleSelectGenre(e)}
                >
                  
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>


                <label className={"label-create-" + clase} >Description: </label>
                <textarea
                type="text"
                maxLength= '500'
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}

                />

            </div>
              <div className={"button-container-" + clase}>
                <button className={"button-create-" + clase} type='submit'>Create game</button>
              </div>

        </form>

        
                {/* <ul>
                  <li>
                    {input.genres.map((g => g + " ," ))}
                  </li>
                </ul>

                <ul>
                  <li>
                    {input.platforms.map((p => p + " ," ))}
                  </li>
                </ul> */}
        <div className="footer">
            <Footer />
        </div>
        </div>
    </div>
  );
};
