import './home.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames,getGenres, filterGamesByGenre, orderVideogamesByAZ, filterGamesByPlatform, getPlatforms } from '../../redux/action/';
import { Link } from 'react-router-dom';
import { Card } from '../card/Card.jsx';
import { Paginate } from '../paginate/Paginate.jsx';
import { Footer } from '../footer/Footer';
import { SearchBar } from '../searchBar/SearchBar';
import { Nav } from '../nav/Nav';





export const Home = () => {
    const dispatch = useDispatch();
    const allGames = useSelector(state => state.games);
    const clase = useSelector(state => state.theme)
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);

    //Paginado de 15 en 15
    const [currentPage, setCurrentPage] = useState(1); // pagina actual
    const [gamesPerPage] = useState(15);// 15 juegos por pagina
    

    const indexOfLastGame = currentPage * gamesPerPage; // 15 indice del ultimo juego por pagina
    const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 0 indice del primer juego menos 
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame); // 0, 15 indice del primer juego y el ultimo juego por pagina 
    //slice corta el array y devuelve un nuevo array con los elementos seleccionados, pagina 1 = 0, 15, pagina 2 = 15, 30, pagina 3 = 30, 45
    const paginate = (pageNumber) => setCurrentPage(pageNumber);// pagina actual = numero de pagina que se le pasa por parametro



    useEffect(() => {
        if(!allGames.length) dispatch(getGames());
        if(!genres.length) dispatch(getGenres())
        if(!platforms.length) dispatch(getPlatforms());

    }, [dispatch]);

    function handleFilterGenre(e) {
        dispatch(filterGamesByGenre(e.target.value));
    }

    function handleFilterPlatform(e) {
        dispatch(filterGamesByPlatform(e.target.value));
    }

    function handleOrderAZ(e) {
        e.preventDefault();
        dispatch(orderVideogamesByAZ(e.target.value));
        if(e.target.value === 'All') {
            dispatch(getGames());
        }
    }


    return (
        <div className={"home-container-" + clase}>
            <Nav /> 
            <div className={"filter-container-" + clase}>
                {/* <h5>Order by:</h5> */}
                <select onChange={(e) => {handleOrderAZ(e);}} >
                    <option value="All" disabled>Name</option>
                    <option value="All">All</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>

                <select >
                    <option value= 'All'>All Types</option>
                    <option value= 'created'>Created</option>
                    <option value= 'existing'>Existing</option>
                </select>

                <select onChange={e => handleFilterGenre(e)} >
                    <option value= '' disabled >Genre</option>
                    <option value='All'>All Genres</option>
                    {
                        genres?.map(g => (
                            <option key= {g.id} value={g.name}>{g.name}</option>
                        ))
                    }
                </select>
                
                <select onChange={e => handleFilterGenre(e)} >
                    {/* <option value= '' disabled>Genre</option>
                    <option value='All'>All Genres</option>
                    <option value= 'Action'>Action</option>
                    <option value= 'Indie'>Indie</option>
                    <option value= 'Adventure'>Adventure</option>
                    <option value= 'RPG'>RPG</option>
                    <option value= 'Shooter'>Shooter</option>
                    <option value= 'Casual'>Casual</option>
                    <option value= 'Strategy'>Strategy</option>
                    <option value= 'Simulation'>Simulation</option>
                    <option value= 'Puzzle'>Puzzle</option>
                    <option value= 'Arcade'>Arcade</option>
                    <option value= 'Platformer'>Platformer</option>
                    <option value= 'Racing'>Racing</option>
                    <option value= 'Massively Multiplayer'>Massively Multiplayer</option>
                    <option value= 'Sports'>Sports</option>
                    <option value= 'Fighting'>Fighting</option>
                    <option value= 'Family'>Family</option>
                    <option value= 'Board Games'>Board Games</option>
                    <option value= 'Educational'>Educational</option>
                    <option value= 'Card'>Card</option> */}
                </select>

                <select >
                    <option value= '' disabled>Platforms</option>
                    <option value='All'>All Platforms</option>
                </select>
            </div>
            <div>
                <SearchBar />
            </div>

                <div className={"pagination-container-" + clase} >
                    <Paginate 
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginate={paginate}
                    currentPage={currentPage}  />
                </div>

                <div  className={"card-container-" + clase} >
                
                    {currentGames?.map((game) => {
                        return (
                                    <Link key={game.id} to={'/game/' + game.id } style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                        <Card
                                            key={game.id}
                                            name={game.name}
                                            img={game.img}
                                            genres={game.genres}
                                        />
                                    </Link>
                                )
                    })
                }
                </div>
                <div className={"pagination-container-botoon-" + clase} >
                <Paginate 
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginate={paginate}
                    currentPage={currentPage}  />
                </div>
                <Footer />
        </div>
    )
}