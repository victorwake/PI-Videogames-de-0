import React , { useCallback } from "react";
import { Nav } from '../nav/Nav';
import './setGame.css';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../loading/Loading';


//pagina donde te manda despues de eliminar un juego o crearlo
export const SetGame = () => {

    const navigate = useNavigate();
    
    const redirectToHome = useCallback(() => {
        setTimeout(redirectToHome, 5000)
        navigate('/home');
    }, [navigate]);

    redirectToHome();


    return (
        <div className='congc1'>
            <Nav />
            < Loading />
        </div>  
    )
};

