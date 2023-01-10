import { nameASC } from '../../helpers/sort.js';
import {
    THEME_CHANGE, 
    THEME_LIGHT, 
    THEME_DARK,
    GET_GAMES,
    FILTER_GAMES_BY_GENRE,
    FILTER_GAMES_BY_PLATFORM,
    ORDER_BY_AZ,
    GET_GAME_NAME,
    GET_GENRES,
    POST_GAME,
    GET_PLATFORMS,
    GET_GAME_BY_ID,
    CLEAN_DETAILS
        } from '../action/index.js';

const initialState = {
    theme: 'dark',
    games: [],
    allGames: [],
    genres: [],
    platforms: [],
    details: [],
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
            const allGames = state.allGames;
            const genreFilter = action.payload === 'All'
                ? allGames 
                : allGames.filter((g) => g.genres.includes(action.payload));
            return {
                ...state,
                games: genreFilter
            };

        /* Filtrar por plataforma */
        case FILTER_GAMES_BY_PLATFORM:
            const allGames2 = state.allGames;   
            const platformFilter = action.payload === 'All'
                ? allGames2
                : allGames2.filter((g) => g.platforms.includes(action.payload));
            return {
                ...state,
                games: platformFilter
            };

        /* Ordenar por nombre */
            case ORDER_BY_AZ:
                const videogames = [...state.games];
                const orderAZ =
                action.payload === 'All'
                    ? videogames
                    : action.payload === 'asc'
                    ? videogames.sort((a, b) =>
                        a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                    )
                    : videogames.sort((a, b) =>
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

        case POST_GAME:
            return {
                ...state,
            }

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload.sort(nameASC)
            }    
        
        case GET_GAME_BY_ID:
            return {
                ...state,
                details: action.payload
            }

            /* Limpio el details */
        case CLEAN_DETAILS:
            return {
                ...state,
                details: action.payload
            }

        default:
            return state;
        }
}

export default rootReducer;