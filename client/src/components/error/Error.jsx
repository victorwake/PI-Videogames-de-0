import './error.css'
import React , { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import urlNotFount from '../../img/urlNoFount.gif'






export const Error = () => {
    
    const navigate = useNavigate();
    
    const redirectToHome = useCallback(() => {
        setTimeout(redirectToHome, 5000)
        navigate('/home');
    }, [navigate]);

    redirectToHome();

    return (
        <div className="noFonund" >
            <img  className='img'  src={ urlNotFount } alt="imgNotFound" />
        </div>
    );
}