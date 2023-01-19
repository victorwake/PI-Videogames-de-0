import './error.css'
import React from "react";
import { useNavigate } from 'react-router-dom';
import urlNotFount from '../../img/urlNoFount.gif'






export const Error = () => {
    
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/home');
    }, 5000);

    return (
        <div className="noFonund" >
            <img  className='img'  src={ urlNotFount } alt="imgNotFound" />
        </div>
    );
}