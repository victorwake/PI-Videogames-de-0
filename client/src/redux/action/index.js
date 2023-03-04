import axios from 'axios';

/*Cambio de tema*/
export const themeChange = (theme) => {
    if (theme === 'light') {
        return {
            type: THEME_LIGHT
        };
    } else if (theme === 'dark') {
        return {
            type: THEME_DARK
        };
    }
};
export const THEME_CHANGE = 'THEME_CHANGE';

export  const themeLight = () => {
    return {
        type: THEME_LIGHT,
        theme: 'light'
    }
};
export const THEME_LIGHT = 'THEME_LIGHT';

export  const themeDark = () => {
    return {
        type: THEME_DARK,
        theme: 'dark'
    } 
};
export const THEME_DARK = 'THEME_DARK';

/*Fin de cambio de tema*/

/*----------------------------------------------*/


//Traigo todos los juegos 
export const getGames = () => {
    return dispatch => axios('https://henry-games.onrender.com/games')
    .then(res => dispatch({ type: GET_GAMES, payload: res.data }))
    .catch(err => console.log(err));
};
export const GET_GAMES = 'GET_GAMES';

/*----------------------------------------------*/

//Traigo los generos
export const getGenres = () => {
    return dispatch => axios('https://henry-games.onrender.com/genres')
    .then(res => dispatch({ type: GET_GENRES, payload: res.data}))
    .catch(err => console.log(err));  
};
export const GET_GENRES = 'GET_GENRES';

/*----------------------------------------------*/

//Traigo las plataformas
export const getPlatforms = () => {
    return dispatch => axios('https://henry-games.onrender.com/platforms')
    .then(res => dispatch({ type: GET_PLATFORMS, payload: res.data}))
    .catch(err => console.log(err));  
};
export const GET_PLATFORMS = 'GET_PLATFORMS';
/*----------------------------------------------*/

//Traigo los juegos por nombre
export const getGameByName = name => {
    return dispatch => {
    axios(`https://henry-games.onrender.com/games?name=${name}`)
    .then(res => {
    dispatch({ type: GET_GAME_BY_NAME, payload: res.data});
    dispatch(changeCurrentPage(1)); // actualiza el currentPage a 1
    })
    .catch(err => console.log(err));
    }
    };
export const GET_GAME_BY_NAME= 'GET_GAME_BY_NAME';
/*----------------------------------------------*/

//Traigo los juegos por id
export const getGameDetail = id => {
    return dispatch => axios(`https://henry-games.onrender.com/game/${id}`)
    .then(res => dispatch({ type: GET_GAME_DETAIL, payload: res.data}))
    .catch(err => console.log(err));
};
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
/*----------------------------------------------*/

export const changeCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: CURRENT_PAGE, payload})
    }
};
export const CURRENT_PAGE = 'CURRENT_PAGE';

/*----------------------------------------------
------------------------------------------------
------------------------------------------------*/


export const changeSearchGame = payload => {
    return dispatch => {
        dispatch({ type: SEARCH_GAME, payload})
    }
};
export const SEARCH_GAME = 'SEARCH_GAME';
/*----------------------------------------------*/

export const changeUseFilter = payload => {
    return dispatch => {
        dispatch({ type: USE_FILTER, payload })
    }
};
export const USE_FILTER = 'USE_FILTER';
/*----------------------------------------------*/

export const changeGenresFilter = payload => {
    return dispatch => {
        dispatch({ type: GENRE_FILTER, payload})
    }
};
export const GENRE_FILTER = 'GENRE_FILTER';
/*----------------------------------------------*/

export const changePlatformsFilter = payload => {
    return dispatch => {
        dispatch({ type: PLATFORMS_FILTER, payload})
    }
};
export const PLATFORMS_FILTER = 'PLATFORMS_FILTER';
/*----------------------------------------------*/

export const changeTypeFilter = payload => {
    return dispatch => {
        dispatch({ type: TYPE_FILTER, payload})
    }
};
export const TYPE_FILTER = 'TYPE_FILTER';
/*----------------------------------------------*/

export const changeNameOrder = payload => {
    return dispatch => {
        dispatch({ type: NAME_ORDER, payload })
    }
};
export const NAME_ORDER = 'NAME_ORDER';
/*----------------------------------------------*/

export const changeRatingOrder = payload => {
    return dispatch => {
        dispatch({ type: RATING_ORDER, payload })
    }
};
export const RATING_ORDER = 'RATING_ORDER';
/*----------------------------------------------*/

/*----------------------------------------------
------------------------------------------------
------------------------------------------------*/

export const cleanAllFilters = () => {
    return dispatch => {
        dispatch({ type: CLEAN_ALL_FILTERS })
    }
};
export const CLEAN_ALL_FILTERS = 'CLEAN_ALL_FILTERS';
/*----------------------------------------------*/

export const cleanStateByName = payload => {
    return dispatch => {
        dispatch({ type: CLEAN_STATE_BY_NAME, payload })
    }
};
export const CLEAN_STATE_BY_NAME = 'CLEAN_STATE_BY_NAME';
/*----------------------------------------------*/

export const resetPage = payload => {
    return dispatch => {
        dispatch({ type: RESET_PAGE, payload})
    }
}
export const RESET_PAGE = 'RESET_PAGE';
/*----------------------------------------------*/

export const cleanGameDetail = payload => {
    return dispatch => {
        dispatch({ type: CLEAN_DETAIL, payload})
    }
};
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
/*----------------------------------------------*/

export const getReleased = payload => {
    return dispatch => {
        dispatch({ type: RELEASED, payload })
    }
}
/*----------------------------------------------*/
export const RELEASED = 'RELEASED';