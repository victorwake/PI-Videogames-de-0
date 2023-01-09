import './card.css';
import React from "react";
import { useSelector } from "react-redux";


export const Card = ({ name, img, genres }) => {//se lo paso por props
    const clase = useSelector(store => store.theme);
    return (
        <div className={"card-container-" + clase}>
            
                <div className={"card-" + clase}>
                    <div className={"img-container-" + clase}><img className={"img-" + clase} src={img} alt = {name} /></div>
                    <div><h2 className={"name-container-" + clase} >{name}</h2></div>
                    <div><h4 className={"genres-container-" + clase}>{genres.join(' | ')} </h4></div>
                </div>
        </div>
    );
    }
