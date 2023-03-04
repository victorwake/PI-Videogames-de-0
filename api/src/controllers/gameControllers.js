require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

/*
Busco un juego por ID
*/
const getGameID = async (req, res) => {
    const { id } = req.params;
    if (id.length > 5){//si el id es mayor a 5 es un id de la base de datos, ya que la api solo tiene 5 digitos
        try {
            let apiDb = await Videogame.findOne({
                where: {id},
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: { attributes: [] }//para que no me traiga los atributos de la tabla intermedia
                }
            });
            if (apiDb) {
                let game = {
                    id: apiDb.id,
                    name: apiDb.name,
                    description: apiDb.description,
                    released: apiDb.released,
                    rating: apiDb.rating,
                    platforms: apiDb.platforms.map((platform) => platform),
                    genres: apiDb.genres.map((genre) => genre.name),
                    img: apiDb.img,
                };
                res.status(200).send(game);
            } else {
                res.status(404).send({msg: 'Game not found'});//uso el msg: para poder manejarlo en el front
            }
        } catch (error) {
            res.status(404).send({ msg: 'The Videogame with that id was not found...' });//uso el msg: para poder manejarlo en el front
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
                img: api.data.background_image,
            };
            res.status(200).send(game);
        } catch (error) {
            res.status(404).send({ msg: 'The Videogame with that id was not found' });//uso el msg: para poder manejarlo en el front
        }
    }
};
/*Fin de buscar un juego por ID*/

/*
---------------------------------------------------------------------------------------------------------
*/

/*
Creo un nuevo juego en la DB
*/
const postGame = async (req, res, next) => {//uso el next para poder manejar los errores en el middleware
    const { name, description, released, rating, platforms, genres, img } = req.body;
    try {  
            const newGame = await Videogame.create({
            name, 
            description, 
            released, 
            rating, 
            platforms, 
            img,
    });
    let genreDb = await Genre.findAll({
        where: {
            name: genres,
        },
    });
    newGame.addGenre(genreDb);
    res.status(201).send('The game was created successfully');//201 en una solicitud POST, significa que se creó un recurso
    } catch (error) {
        next(error);       
    }
};

/*Fin de crear un nuevo juego en la DB*/

/*
---------------------------------------------------------------------------------------------------------
*/

/*Eliminar un juego de la DB*/

const deleteGame = async (req, res, next) => {
    const { id } = req.params;
    try {
        let gameDelete = await Videogame.findByPk(id)
        gameDelete.destroy();
        res.status(201).send("Videogame deleted correctly");
    } catch (err) {
        next(err)
    }
};

/*Fin de eliminar un juego de la DB*/

/*
---------------------------------------------------------------------------------------------------------
*/


module.exports = { 
    postGame,
    getGameID,
    deleteGame
    };
