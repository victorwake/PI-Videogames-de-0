require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
// const { allGames } = require('./gamesControllers.js');


/*
Creo un nuevo juego en la DB
*/
const postGame = async (req, res) => {
    const { name, description, released, rating, platforms, genres, img } = req.body;
            const newGame = await Videogame.create({
            name, 
            description, 
            released, 
            rating, 
            platforms, 
            img
    });
    let genreDb = await Genre.findAll({
        where: {
            name: genres,
        },
    });
    await newGame.addGenre(genreDb);
    res.status(200).send('The game was created successfully');
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
                    platforms: apiDb.platforms.map((platform) => platform),
                    genres: apiDb.genres.map((genre) => genre.name),
                    img: apiDb.img,
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
                img: api.data.background_image,
            };
            res.status(200).send(game);
        } catch (error) {
            res.status(404).send('Game not found');
        }
    }
};
/*Fin de buscar un juego por ID*/

/*
---------------------------------------------------------------------------------------------------------
*/

/*Update de un juego en la DB*/

const updateGameOk = async (req,res,next) => {
    try {
        let { id, name, img, released, rating, description, genres, platforms } = req.body;
        if( !name || !img || !released || !rating || !description || !generos || !platforms){
            return res.status(400).send({error:"Missing info"});
        }else{
            let modifieldGame = await updateGame({id, name, img, released, rating, description, genres, platforms});
        
            return res.status(200).send(modifieldGame);
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error");
        
    }
    };
    
    const updateGame = async ({id, name, img, released, rating, description, genres, platforms}) => {
        let game = await Videogame.findByPk(id);
        if(!game) return {error:"Game not found"};
    
        
        game.name = name;
        game.img = image;
        game.released = released;
        game.rating = rating;
        game.description = description;
        game.genres = genres;
        game.platforms = platforms;
        return game;
    };

/*Fin de update de un juego en la DB*/

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
    getGameById,
    updateGameOk,
    deleteGame
    };
