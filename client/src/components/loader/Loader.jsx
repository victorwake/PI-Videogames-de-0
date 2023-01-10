import './loader.css';
import React from 'react';

export const Loader = () => {
    const clase= useSelector(store => store.theme);


    return (
        <div id={"load" + clase}>
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
        </div>
    )
}