require("dotenv").config();
const { URL_API, API_KEY, API_KEY2 } = process.env;
const axios = require('axios');
const { Genre } = require('../db');



/*Me traigo los generos de la API y los guardo en la DB*/
const getApiGenres = async (req, res, next) => { 
    try {
        const genresApi = (await axios(`${URL_API}/genres?key=${API_KEY}`))
        .data.results.map(e => {
            return {
                id: e.id,
                name: e.name
            }
        });
    await Genre.bulkCreate(genresApi, { ignoreDuplicates: true });
    console.log('genres loaded in the db'); 
    } catch (err) {
        next(err)
    }     
};

const getDbGenres = async (req, res, next) => {
    try {
        const genresDb = await Genre.findAll()
        res.send(genresDb)
    } catch (err) {
        next(err)
    }
}

/*Fin de traer los generos de la API y los guardo en la DB*/

module.exports = {
    getApiGenres,
    getDbGenres,
}