import './loader.css';
import React from 'react';
import  loaderImg  from "../../img/loader.webp"

export const Loading = () => {
    // const clase= useSelector(store => store.theme);


    return (
        <div className="container-loading-general">
        <div className="container-loading" >
            <img width="120px" height="70px"className="img-loading" src={loaderImg} alt="loading"></img>
        </div>
        </div>
    )
}

