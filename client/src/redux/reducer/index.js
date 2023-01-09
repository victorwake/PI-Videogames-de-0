import { nameASC } from '../../helpers/sort.js';
import {
    THEME_CHANGE, 
    THEME_LIGHT, 
    THEME_DARK,
    GET_GAMES,
    FILTER_GAMES_BY_GENRE,
    ORDER_BY_AZ,
    GET_GAME_NAME,
    GET_GENRES,
        } from '../action/index.js';

const initialState = {
    theme: 'dark',
    games: [],
    allGames: [],
    genres: [],
};

function rootReducer(state = initialState, action){
    switch(action.type) {
        case THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            };
        case THEME_LIGHT:
            return {
                ...state,
                theme: 'light'
            };
        case THEME_DARK:
            return {
                ...state,
                theme: 'dark'
            };

        /* Traigo todos los juegos */    
        case GET_GAMES:    
            return {
                ...state,
                games: action.payload,
                allGames: action.payload,
            };

        /* Filtrar por genero */
        case FILTER_GAMES_BY_GENRE:   
            const allGames = state.games;
            const genreFilter = action.payload === 'All'
                ? allGames 
                : allGames.filter((g) => g.genres.includes(action.payload));
            return {
                ...state,
                games: genreFilter
            };

        /* Ordenar por nombre */
            case ORDER_BY_AZ:
                const videogames3 = [...state.games];
                const orderAZ =
                action.payload === 'All'
                    ? videogames3
                    : action.payload === 'asc'
                    ? videogames3.sort((a, b) =>
                        a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                    )
                    : videogames3.sort((a, b) =>
                        a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1
                    );
                return {
                    ...state,
                    games: orderAZ,
                };  
            
        /* Buscar por nombre */
        case GET_GAME_NAME:
            return {
                ...state,
                games: action.payload,
            };

        /* Traigo todos los generos */
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload.sort(nameASC)
            }
        default:
            return state;
        }
}

export default rootReducer;