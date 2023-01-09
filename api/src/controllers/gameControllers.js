require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { allGames } = require('./gamesControllers.js');


/*
Creo un nuevo juego en la DB
*/
const postGame = async (req, res) => {
    const { name, description, release, rating, platforms, genres, img } = req.body;
        try {
            const newGame = await Videogame.create({
            name,
            description,
            release,
            rating,
            platforms,
            img
            })
                const genresDb = await Genre.findAll({
                where: {
                    name: genres
                }
            })
            newGame.addGenres(genresDb)
            res.status(200).send('The game was created successfully')
        } catch (error)  {
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).send('The name of the game already exists');
        }   if (error.name === 'SequelizeValidationError') {
                res.status(400).send('The score must be between 1 to 5');
        }   else{
                res.status(400).send('Error in the server');
        }
    }
};
/*Fin de crear un nuevo juego en la DB*/

/*
---------------------------------------------------------------------------------------------------------
*/

/*
Busco un juego por ID
*/
const getGameById = async (req, res) => {
    const { id } = req.params;
    if (id.length > 5){//si el id es mayor a 5 es un id de la base de datos, ya que la api solo tiene 5 digitos
        try {
            let apiDb = await Videogame.findOne({
                where: { id },
                include: Genre,
            });
            if (apiDb) {
                let game = {
                    id: apiDb.id,
                    name: apiDb.name,
                    description: apiDb.description,
                    released: apiDb.released,
                    rating: apiDb.rating,
                    platforms: apiDb.platforms.map((platform) => platform.name),
                    genres: apiDb.genres.map((genre) => genre.name),
                    image: apiDb.img,
                };
                res.status(200).send(game);
            } else {
                res.status(404).send('Game not found');
            }
        } catch (error) {
            res.status(404).send('Game not found');
        }
    }else {
        try {
            const api = await axios.get(`${URL_API}/games/${id}?key=${API_KEY}`);
            const game = {
                id: api.data.id,
                name: api.data.name,
                description: api.data.description_raw,
                released: api.data.released,
                rating: api.data.rating,
                platforms: api.data.platforms.map((platform) => platform.platform.name),
                genres: api.data.genres.map((genre) => genre.name),
                image: api.data.background_image,
            };
            res.status(200).send(game);
        } catch (error) {
            res.status(404).send('Game not found');
        }
    }
};
/*Fin de buscar un juego por ID*/

module.exports = { 
    postGame,
    getGameById
    };
