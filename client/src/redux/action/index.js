import axios from 'axios';







// Cambio de tema
export const THEME_CHANGE = 'THEME_CHANGE';
export const THEME_LIGHT = 'THEME_LIGHT';
export const THEME_DARK = 'THEME_DARK';

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

export  const themeLight = () => {
    return {
        type: THEME_LIGHT,
        theme: 'light'
    }
};

export  const themeDark = () => {
    return {
        type: THEME_DARK,
        theme: 'dark'
    } 
};

/*Fin de cambio de tema*/

/* 
Traigo todos los juegos 
*/
export function getGames() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/games');
        return dispatch({
            type: GET_GAMES,
            payload: json.data
        });
    };
}
export const GET_GAMES = 'GET_GAMES';

/*----------------------------------------------*/

export function filterGamesByGenre(payload) {
    return {
        type: FILTER_GAMES_BY_GENRE,
        payload
    };
}
export const FILTER_GAMES_BY_GENRE = 'FILTER_GAMES_BY_GENRE';

/*----------------------------------------------*/

export function filterGamesByPlatform(payload) {
    return {
        type: FILTER_GAMES_BY_PLATFORM,
        payload
    };
}

export const FILTER_GAMES_BY_PLATFORM = 'FILTER_GAMES_BY_PLATFORM';

/*----------------------------------------------*/


export function orderVideogamesByAZ(payload) {
    return {
        type: ORDER_BY_AZ,
        payload,
    };
};
export const ORDER_BY_AZ = "ORDER_BY_AZ";

/*----------------------------------------------*/

export function getGameName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/games?name=${name}`);
                if (json.data.length === 0) {
                alert('No se encontraron juegos con ese nombre');
                } else {
                    return dispatch({
                        type: GET_GAME_NAME,
                        payload: json.data.slice(0, 15)
                    });
                }
            } catch (error) {console.log(error);
        }
    }
}
export const GET_GAME_NAME = 'GET_GAME_NAME';

/*----------------------------------------------*/

export function getGenres() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        });
    };
}

export const GET_GENRES = 'GET_GENRES';

/*----------------------------------------------*/

export function postGame(payload) {
    return  (dispatch) => {
        return axios.post('http://localhost:3001/game', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}
        

export const POST_GAME = 'POST_GAME';

/*----------------------------------------------*/

export function getPlatforms() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/platforms');
        return dispatch({
            type: GET_PLATFORMS,
            payload: json.data
        });
    };
}

export const GET_PLATFORMS = 'GET_PLATFORMS';

/*----------------------------------------------*/

export function getGameById(id) {
    return async function (dispatch) {
        try{
            const json = await axios.get(`http://localhost:3001/game/${id}`);
                return dispatch({
                    type: GET_GAME_BY_ID,
                    payload: json.data
                });
        }
        catch(error){console.log(error)}
    }
}

export const GET_GAME_BY_ID = 'GET_GAME_BY_ID';

export function cleanDetails(payload) {
    return {
        type: CLEAN_DETAILS,
        payload
    };
}
export const CLEAN_DETAILS = 'CLEAN_DETAILS';

/*----------------------------------------------*/

export function filterGameApiOrDb(payload) {
    return {
        type: FILTER_GAME_API_OR_DB,
        payload
    };
}

export const FILTER_GAME_API_OR_DB = 'FILTER_GAME_API_OR_DB';

/*----------------------------------------------*/

export const deleteVideogame = (id) => {
    return async function (dispatch) {
        let videogame = await axios.delete(`/game/${id}`);
        return dispatch({
            type: DELETE_VIDEOGAME,
            payload: videogame.data,
        });
    };
};

export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';

/*----------------------------------------------*/

export const loadingAllGame = value => {
    return (dispatch) => {
        dispatch({type: LOAD_ALL_GAME, payload: value})
    }
}

export const LOAD_ALL_GAME = 'LOAD_ALL_GAME'