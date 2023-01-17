import './landingPage.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import imgFound  from '../../img/gamer.png'
import { getGames, getGenres, getPlatforms} from '../../redux/action/';



export function LandingPage() {

    const [imageEffect, setImageEffect] = useState(false); 
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getGames())
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseHover = () => {
        setImageEffect(true); 
    };

    const handleMouseLeave = () => {
        setImageEffect(false); 
    };

return (
    <div className="container-body">
        <div className="container-img">
        <img style={{ filter: imageEffect ? 'grayscale(60%)' : 'grayscale(15%)' }} className='img'  src={imgFound} alt="imgFound" />
        </div>
        <div className="container-button">
        <Link to='/home'>
        <button onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave} className="button">Enter</button>
        </Link>
        </div>
    </div>
)
}