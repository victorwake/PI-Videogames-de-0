require("dotenv").config();
const { URL_API, API_KEY, API_KEY2 } = process.env;
const axios = require('axios');
const { Genre } = require('../db');





/*Me traigo los generos de la API y los guardo en la DB*/
const genres = async (req,res) => {
    try {
        const genresApi = await axios(`${URL_API}/genres?key=${API_KEY}`)
        const genres = genresApi.data.results.map(el => el.name);
            genres.forEach(el => {
                Genre.findOrCreate({//me creo en la db los generos que no existen
                    where: {name: el}
                });
            });
            const genresDb = await Genre.findAll();
            res.status(200).send(genresDb);
    }catch (error) {
        res.status(404).send(error, 'No genres found');
    }
};
/*Fin de traer los generos de la API y los guardo en la DB*/

module.exports = { genres }