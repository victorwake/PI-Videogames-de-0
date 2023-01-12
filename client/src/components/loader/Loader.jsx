import './loader.css';
import React from 'react';
import  loaderImg  from "../../img/loader.webp"

export const Loader = () => {
    // const clase= useSelector(store => store.theme);


    return (
        <div className="container-loading" >
            <img src={loaderImg} alt="loading"></img>
            {/* <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div> */}
        </div>
    )
}

