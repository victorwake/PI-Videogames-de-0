require("dotenv").config();
const { URL_API, API_KEY, API_KEY2 } = process.env;
const axios = require('axios');
const { Genre } = require('../db');



/*Me traigo los generos de la API y los guardo en la DB*/
const getApiGenres = async (req, res, next) => { 
    try {
        let genres = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`))
        .data.results.map(e => ({id: e.id, name: e.name}))
        // await Genre.bulkCreate(genres)
        let arrPromises = genres.map(e => (
            Genre.findOrCreate({where: {id: e.id, name: e.name}})
        ))
        await Promise.all(arrPromises)
        console.log("Genres loaded in the db")
    } catch (error) {
        console.log(error.message)
    }
}

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