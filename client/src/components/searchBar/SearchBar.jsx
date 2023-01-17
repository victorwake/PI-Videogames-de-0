import './searchBar.css';
import { getGameByName,
        changeGenresFilter, 
        changeNameOrder, 
        changePlatformsFilter, 
        changeRatingOrder, 
        changeTypeFilter, 
        changeSearchGame, 
        cleanStateByName 
}  from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { Filters } from '../filters/Filters';
// import { SetFilters } from "../setFilters/SetFilters";


export const SearchBar = () => {
    const clase= useSelector(store => store.theme);
    const dispatch = useDispatch();
    const genresFilter = useSelector(state => state.genresFilter);
    const platformsFilter = useSelector(state => state.platformsFilter);
    const typeFilter = useSelector(state => state.typeFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const ratingOrder = useSelector(state => state.ratingOrder);
    const gameByName = useSelector(state => state.gameByName);
    const searchGame = useSelector(state => state.searchGame);
    
    /* Buscar por nombre
    ------------------------------------------------------*/
    const [input, setInput] = useState('');
    const [button, setButton] = useState('');


    const handleInputChange = e => {
        setInput(e.target.value);
        setButton(e.target.value);
    };

    const cleanFilters = () => {
        if(genresFilter !== '') dispatch(changeGenresFilter(''));
        if(platformsFilter !== '') dispatch(changePlatformsFilter(''));
        if(typeFilter !== '') dispatch(changeTypeFilter(''));
        if(nameOrder !== '') dispatch(changeNameOrder(''));
        if(ratingOrder !== '') dispatch(changeRatingOrder(''));
    }

    const handleSubmit = e => {
        e.preventDefault();
        setInput('');
        if(input) { // sino despacharia la accion de busqueda sin valor
            dispatch(getGameByName(input));
            dispatch(changeSearchGame(true));
            cleanFilters()
        }
    };

    const handleClick = () => {
        setButton('')
        dispatch(cleanStateByName([]))
        dispatch(changeSearchGame(false));
        cleanFilters()
    }

    let disabled = false
    if(!!gameByName.length && searchGame) disabled = true



    return (
            <form onSubmit={handleSubmit}>
                {/* <Filters /> */}
                <div className={'conteiner-search-' + clase}>
                    
                    <div className={'conteiner-select-' + clase}>
                    
                    {/* <SetFilters />  */}
                    </div>
                    {/* <div className={'conteiner-select-' + clase}>
                    
                    </div> */}
                    <div>
                        <div className={'form-search-' + clase}>	
                            <input 
                            id='input-search'
                            className={'imput-search-' + clase} 
                            type="text" 
                            laceholder='Search Game'
                            onChange={handleInputChange}
                            value={input}
                            maxLength= '30'
                            disabled = {disabled}
                            >
                            </input>	
                            {/* {disabled &&  */}
                            <button 
                            id='button-search' 
                            className={'button-search-' + clase} 
                            onClick={handleClick}
                            >
                            Search:
                            </button>
                            {/* } */}
                            {!!button.length && !!gameByName.length && <span className="span">✓ your search: {button}</span>}
                        </div>
                    </div>
                </div>
            </form>
    )
}