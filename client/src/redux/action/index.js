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
                        payload: json.data
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
