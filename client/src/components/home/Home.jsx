import './home.css'
import  React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, getPlatforms} from '../../redux/action/';
import { Link } from 'react-router-dom';
import { Card } from '../card/Card.jsx';
import { Pagination } from '../pagination/Pagination';
import { NotFound } from '../notFound/NotFound'
import { Footer } from '../footer/Footer';
import { SearchBar } from '../searchBar/SearchBar';
import { Nav } from '../nav/Nav';
import { Loading } from '../loading/Loading';
import { nameASC, nameDES, ratingWORST, ratingBEST } from '../../helpers/sort';
import { Filters } from '../filters/Filters';
// import { SetFilters } from "../setFilters/SetFilters";



export const Home = () => {
    const dispatch = useDispatch();
    const clase = useSelector(state => state.theme)
    const currentPage = useSelector(state => state.currentPage);
    const allGames = useSelector(state => state.allGames);
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
    const gameByName = useSelector(state => state.gameByName);
    const searchGame = useSelector(state => state.searchGame);
    const useFilter = useSelector(state => state.useFilter)
    const genresFilter = useSelector(state => state.genresFilter);
    const platformsFilter = useSelector(state => state.platformsFilter);
    const typeFilter = useSelector(state => state.typeFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const ratingOrder = useSelector(state => state.ratingOrder);
    const released = useSelector(state => state.released)


    // defino qué renderizar según los filtros
    let games = []  
    searchGame && !gameByName.msg ? games = [...gameByName] : games = [...allGames];

    if(typeFilter === 'created') games = games.filter(g => typeof g.id === 'string');
    if(typeFilter === 'existing') games = games.filter(g => typeof g.id === 'number');       
    if(nameOrder === 'asc' ) games.sort(nameASC);
    if(nameOrder === 'desc') games.sort(nameDES);   
    if(ratingOrder === 'worst rating') games.sort(ratingWORST);          
    if(ratingOrder === 'best rating') games.sort(ratingBEST);
    
    if(released === 'worst released"') games.sort(ratingWORST);
    if(released === 'best released') games.sort(ratingBEST);
    
    if(genresFilter.length !== 0 && genresFilter !== 'all') games = games.filter(g => g.genres.includes(genresFilter));
    if(platformsFilter.length !== 0 && platformsFilter !== 'all') games = games.filter(g => g.platforms.includes(platformsFilter));
    
    // paginado
    const gamesPerPage = 15;
    const indexLastGame = currentPage * gamesPerPage;
    const indexFirstGame = indexLastGame - gamesPerPage;
    const currentGames = games.slice(indexFirstGame, indexLastGame);

    // me traigo info del back si no tengo datos
    useEffect(()=> {
        if(!games.length) dispatch(getGames())
        if(!genres.length) dispatch(getGenres())
        if(!platforms.length) dispatch(getPlatforms())
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    // defino loading
    let loading = false
    if ( !games.length && !useFilter && !searchGame) loading = true;
    if ( searchGame && !gameByName.msg && !gameByName.length ) loading = true;

    // defino notFound
    let notFound = false;
    if(searchGame && gameByName.msg) notFound = true;
    if(!games.length && useFilter) notFound = true;





    return (
        <div className={"home-container-" + clase}>
            <Nav /> 
            {/*  */}
            <div>
                <SearchBar />
                <Filters />
            </div>

                <div className={"pagination-container-" + clase} >
                { !gameByName.msg && <Pagination games = {games.length} gamesPerPage = {gamesPerPage} />}
                </div>

                <div className={"filter-container-a-" + clase}>     
                <div  className={"card-container-" + clase} >
                
                {loading && <Loading />}
                {notFound && <NotFound />}
                {!loading && !!currentGames.length && !notFound &&
                <Fragment>
                    {currentGames?.map((game => (
                        <Fragment key={game.id}>
                                    <Link to={'/game/' + game.id } style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                        <Card
                                            key={game.id}
                                            name={game.name}
                                            img={game.img}
                                            genres={game.genres}
                                            platforms={game.platforms}
                                        />
                                    </Link>
                        </Fragment>
                        )))}
                    </Fragment>
                    }
                    
                    
                </div>
                </div> 
                
                <div className={"pagination-container-botoon-" + clase} >
                { !gameByName.msg && <Pagination games = {games.length} gamesPerPage = {gamesPerPage} />}
                </div>
                <div className={"footer-home-" + clase}>
                <Footer />
                </div>
        </div>
    )
}
