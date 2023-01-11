import './details.css';
import React from 'react';
import { useSelector } from "react-redux";
import { getGameById, cleanDetails, getGames } from '../../redux/action';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Footer } from '../footer/Footer';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import { deleteGame } from '../../helpers/deleteGame';


export const Details = () => {
    const clase= useSelector(store => store.theme);// accede al estado de redux useSelector
    const {id} = useParams();
    const dispatch = useDispatch();
    const detal = useSelector((state)=>state.details) 

    console.log(detal)
    useEffect(()=>{
        dispatch(getGameById(id))
        return () => {
            dispatch(cleanDetails({}))
        }
    },[dispatch,id])

    // Function to delete:
    function handleDelete(id) {
        if (
            window.confirm(
            `Are you sure you want to delete the videogame ${detal.name}?`
            // `Are you sure you want to delete the videogame ${detal.id}?`
            )
        ) {
            deleteGame(id)
            dispatch(getGames())
                .then((res) => {
                alert('Videogame deleted');
            })
            .catch((err) => {
                alert('Apologies! We have encountered an error. Try again.');
            });
        }
    }
    
    return (
        
        <div className={'conteiner-card-details-found-' + clase}>
            <div className={'conteiner-details-' + clase}>
            < Nav />
            </div>
                <div className={'conteiner-card-details-' + clase}>
                    <div className={'card-details-' + clase}>
                        <h1 className={'h1-details-' + clase}>{detal.name}</h1>
                        <img className={'image-details-' + clase} src={detal.img} />

                        <p className={'description-title-' + clase}>Genres:</p>
                        <p className={'genres-details-' + clase}>
                            {detal.genres?.map((g, i) => {
                                if (typeof detal.genres[0] === 'string') {
                                    return g
                                            
                                } else {
                                    return g.name
                                }
                            }).join(' | ')}   
                            </p>
                        {/* <p className={'genres-details-' + clase}> {detal.genres>1?detal.genres.join('-'):detal.genres}</p> */}


                        <p className={'description-title-' + clase}>Platforms: </p>
                        <p className={'platforms-details-' + clase}>{detal.platforms?.map((p) => 
                                p
                            ).join(' | ')}</p>

                        <p className={'description-title-' + clase}>Description:</p>
                        <p className={'description-details-' + clase}> {detal.description}</p>

                        <p className={'description-title-' + clase}>Released date:</p>
                        <p className={'release-title-' + clase}>{detal.released}</p>

                        <p className={'description-title-' + clase}>Rating:</p>
                        <div className={'rating-container-' + clase}>
                        <p >{detal.rating}</p>
                        <span className={"spam-container-" + clase} >&#9733;</span>
                        </div>
                        <Link to="/home">
                        {/* Delete button: */}
                        {isNaN(id) ? (
                            <button type='button' className={'button-delete-' + clase} onClick={handleDelete}>X</button>
                        ) : null}
                        </Link>
                    </div>

                        <div className='footer-details'>
                            <Footer />
                        </div>
                </div>
                
        </div>
    )
}   