import './create.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postGame, getPlatforms, getGenres } from '../../redux/action';
import { Footer } from '../footer/Footer';
import { Nav } from '../nav/Nav';
import { Loader } from '../loader/Loader';


export const CreateGame = () => {
    const dispatch = useDispatch();
    const clase= useSelector(store => store.theme);
    const platforms = useSelector(state => state.platforms);
    const genres = useSelector(state => state.genres);

    const [input, setInput] = useState({
        name: '',
        img: '',
        released: '',
        rating: '',
        platforms: [],
        genres: [],
        description: '',
    });

    useEffect(() => {
        if(!platforms.length) dispatch(getPlatforms());
        if (!genres.length) dispatch(getGenres());
    }, [dispatch]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };
        

    return (
        <div className={"create-container-" + clase}>
            <Nav />
            <div className={"create-box-" + clase}>
            <form className={"form-container-" + clase} >
                <div className={"form-box-" + clase} >

                    <label className={"label-create-" + clase} >Name:</label>
                    <input  
                    type="text" 
                    maxLength= '30'
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    />

                    <label className={"label-create-" + clase} >Image URL: </label>
                    <input  
                    type="text" 
                    value={input.img}
                    name="img" 
                    placeholder= 'url...'
                    onChange={handleChange}
                    />

                    <label className={"label-create-" + clase} >Release date: </label>
                    <input  
                    type="date" 
                    value={input.released}
                    name="released" 
                    onChange={handleChange}
                    />

                    <label className={"label-create-" + clase} >Rating: </label>
                    <input  
                    type="number" 
                    step='0.1'
                    min='0'
                    max='5'
                    value={input.rating}
                    name="rating" 
                    onChange={handleChange}
                    />

                    <label className={"label-create-" + clase} >Platforms: </label>
                    <select
                    name="platforms"
                    value={input.platforms}
                    multiple
                    onChange={handleChange}
                    >
                        {platforms.map((platform) => (
                            <option key={platform.id} value={platform.id}>{platform.name}</option>
                        ))}
                    </select>

                    <label className={"label-create-" + clase} >Genres: </label>
                    <select
                    name="genres"
                    value={input.genres}
                    multiple
                    >
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>

                    <label className={"label-create-" + clase} >Description: </label>
                    <textarea
                    type="text"
                    maxLength= '500'
                    value={input.description}
                    name="description"
                    
                    />
                    
                </div>
                
            </form>

            <div className={"button-container-" + clase}>
                <button className={"button-create-" + clase} type='submit'>Create game</button>
            </div>

            <div className="footer">
                <Footer />
            </div>
            </div>
            <Loader />
        </div>
    )

}