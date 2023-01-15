import './landingPage.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import imgFound  from '../../img/gamer.png'






export function LandingPage() {

    const [imageEffect, setImageEffect] = useState(false); 


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