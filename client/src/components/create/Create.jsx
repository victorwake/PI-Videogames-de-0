import "./create.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postGame,
  getPlatforms,
  getGenres,
  getGames,
} from "../../redux/action";
import { Footer } from "../footer/Footer";
import { Nav } from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import imgDefault from "../../img/default.jpg";

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

  const [errors, setErrors] = useState({});

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.img) input.img = imgDefault;
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
    navigate("/home"); // es el remplazo de useHistory en react 6
  };
  

  const deleteChoice = (category, value) => {
    const newValues = input[category].filter((e) => e !== value);
    setInput({
      ...input,
      [category]: newValues,
    });
    setErrors(
      validate({
        ...input,
        [category]: newValues,
      })
    );
  };

  const validate = (input) => {
    let errors = {};
    if (!input.name) errors.name = "Name is required";
    else if (!/^[^@#$%^&]+$/.test(input.name))
      errors.name = "Name must not contain special characters (@#$%^&)";
    if (!input.description) errors.description = "Description is required";
    if (!input.genres.length)
      errors.genres = "You must select at least one genre";
    if (
      input.released &&
      !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)
    )
      errors.released = "Release date must be in the format yyyy-mm-dd";
    if (input.rating < 0 || input.rating > 5)
      errors.rating = "Rating must be a number between 0 and 5";
    if (input.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image))
      errors.image = "Image URL must have a valid URL format (http/https/ftp)";
    else if (input.image && !/(\.|=)(jpg|png|gif)$/i.test(input.image))
      errors.image = "Image URL must have a valid image format (jpg/png/gif)";
    if (!input.platforms.length)
      errors.platforms = "You must select at least one platform";
    return errors;
  };

  return (
    <div className={"create-container-" + clase}>
      <Nav />
      <div>
        <div className={"container-create-" + clase}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={"container-create-form-" + clase}
          >
            <div className={"container-create-title-" + clase}>
              <h3 className={"title-create-" + clase}>
                🎮 Create your own video game! 🎮
              </h3>
            </div>
            <div class="containerCreateBody">
              <div class="columnsForm">
                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Name:{" "}
                  </label>
                  <input
                    className={"inputName-" + clase}
                    autocomplete="off"
                    type="text"
                    maxLength="30"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.name && (
                    <span className="fontErrorsCreate">{errors.name}</span>
                  )}
                </div>
                <br />

                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Description:{" "}
                  </label>
                  <textarea
                    name="description"
                    className={"inputDescription-" + clase}
                    autocomplete="off"
                    type="text"
                    maxLength="500"
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  {errors.description && (
                    <span className="fontErrorsCreate">
                      {errors.description}
                    </span>
                  )}
                </div>
                <br />

                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Genres:{" "}
                  </label>
                  <select
                    id="selectGenreCreate"
                    name="genres"
                    // multiple={true}
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
                    {errors.genres && (
                      <span className="fontErrorsCreate">{errors.genres}</span>
                    )}
                  </div>
                </div>
              </div>

              <div class="columnsForm">
                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Release date:{" "}
                  </label>
                  <input
                    className={"inputRelease-"+ clase}
                    type="date"
                    value={input.released}
                    name="released"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.released && (
                    <span className="fontErrorsCreate">{errors.released}</span>
                  )}
                </div>
                <br />

                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Rating:{" "}
                  </label>
                  <input
                    className={"inputRating-" + clase}
                    autocomplete="off"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={input.rating}
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.rating && (
                    <span className="fontErrorsCreate">{errors.rating}</span>
                  )}
                </div>
                <br />

                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Image URL:{" "}
                  </label>
                  <input
                    className={"inputImgURL-" + clase}
                    autocomplete="off"
                    type="text"
                    value={input.img}
                    name="img"
                    placeholder="url..."
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {errors.image && (
                  <span className="fontErrorsCreate">{errors.image}</span>
                )}
                <br />

                <div>
                  <label
                    id="fontBodyCreate"
                    className={"block-create-" + clase}
                  >
                    Platforms:{" "}
                  </label>
                  <select
                    className="selectPlatformCreate"
                    name="platforms"
                    // multiple={true}
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
                                  onClick={() => deleteChoice("genres", platform)}
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
                                  onClick={() => deleteChoice("genres", platform)}
                                >
                                  X
                                </button>
                              </div>
                            );
                          return <div></div>;
                        })}
                    </div>
                    {errors.platforms && (
                    <span className="fontErrorsCreate">{errors.platforms}</span>
                  )}
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="containerButtonCreate">
              <button
                type="submit"
                disabled=""
                className={"create-disable-" + clase}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
