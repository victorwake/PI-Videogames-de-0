import './gameDetail.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getGameDetail, cleanGameDetail, getGames, cleanAllFilters } from '../../redux/action';
import { NotFound } from '../notFound/NotFound'
import { Loading } from '../loading/Loading';
import { deleteGame } from '../../helpers/deleteGame';
import { Nav } from '../nav/Nav';
import { useParams } from "react-router-dom";
import { Footer } from '../footer/Footer';




export const GameDetail = () => {
    const clase= useSelector(store => store.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();//remplazo de useHistory
    const gameDetail = useSelector(state => state.gameDetail)

    const {id} = useParams();// accedo a los parametros de la url

    useEffect(()=>{
        dispatch(getGameDetail(id))
        return () => { 
            dispatch(cleanGameDetail({}))
        }
    }, [dispatch, id]);

    // funcion para actualizar el juego
    // const handleUpdate = () => {
    //     dispatch(gameUpdate(gameDetail));
        
    // };

    // funcion para eliminar el juego
    const handleDelete = () => {
        deleteGame(id);
        dispatch(getGames());
        dispatch(cleanAllFilters());
        navigate('/setgame');//redirecciona a la pagina de setgame, el remplazo de useHistory
    };


    const modifyDescription = () => {
        return {__html: gameDetail?.description};
    }


    let loading = false
    if (!Object.keys(gameDetail).length) loading = true;

    if (gameDetail.msg) return (<><button><Link to='/home'>Back</Link></button><NotFound /></>)



    return (
        
        <div className={'conteiner-card-details-found-' + clase}>



            <div className={'conteiner-details-' + clase}>
                < Nav />
            </div>



            { loading ? <Loading /> :
                <div className={'conteiner-card-details-' + clase}>

                    <div className={'card-details-' + clase}>
                    <ul>
                    <Link style={{color: 'inherit',  textDecoration: 'inherit'}} to="/home">
                        <button className={'button-back-' + clase}>Back</button>
                    </Link>
                    </ul>
                        <h1 className={'h1-details-' + clase}>{gameDetail?.name}</h1>
                        <img className={'image-details-' + clase} src={gameDetail?.img} alt={gameDetail?.name} />


                        <p className={'description-title-' + clase}>Genres:</p>
                        <p className={'genres-details-' + clase}>
                            {gameDetail.genres?.map((g, i) => {
                                if (typeof gameDetail.genres[0] === 'string') {
                                    return g
                                            
                                } else {
                                    return g.name
                                }
                            }).join(' | ')}   
                            </p>



                        <p className={'description-title-' + clase}>Platforms: </p>
                        <p className={'platforms-details-' + clase}>{gameDetail?.platforms?.map((p) => 
                                p
                            ).join(' | ')}
                        </p>


                        <p className={'description-title-' + clase}>Description:</p>
                        <div className={'description-details-' + clase} dangerouslySetInnerHTML={modifyDescription()}></div>



                        <p className={'description-title-' + clase}>Released date:</p>
                        <p className={'release-title-' + clase}>{gameDetail.released}</p>

                        <p className={'description-title-' + clase}>Rating:</p>
                        <div className={'rating-container-' + clase}>
                        <p >{gameDetail.rating}</p>
                        <span className={"spam-container-" + clase} >&#9733;</span>
                        </div>
            

            

                        {/* Delete button: */}
                        {isNaN(id) ? (
                            <div className={'button-delete-container-' + clase}>
                                {/* <Link to={`/game/${id}/update`}>
                                    <button className='detbut' type="button" onClick={handleUpdate}>Update</button>
                                </Link> */}
                                    <button className={'button-delete-' + clase} type="button" onClick={handleDelete}>X</button>
                            </div>
                        ) : null}

                    </div>
                        <div className='footer-details'>
                            { <Footer />} 
                        </div>
                </div>
                


            }   
        </div>
    )
}   