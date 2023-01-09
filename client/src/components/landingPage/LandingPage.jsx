import './landingPage.css';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import imgFound  from '../../img/gamer.png'
import * as actions from '../../redux/action/index';




export function LandingPage() {

    const dispatch = useDispatch();
    const [imageEffect, setImageEffect] = useState(false); 

    useEffect(() => {      
        dispatch(actions.themeChange('dark'));
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

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