require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');




/*
Traigo todos las 5 primeras paginas de la API(100 juegos)
*/
const getApiGames = async () => {
    const url = `${URL_API}/games?key=${API_KEY}`
    try {                         
        let infoApiGames = [];
        let res = await axios(url)

        for (let i = 0; i < 5; i++) {
            infoApiGames = infoApiGames.concat(res.data.results)   
            res = await axios(res.data.next);
        }
        infoApiGames = infoApiGames.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(p => p.platform.name),
                    genres: e.genres.map(g => g.name),
                    img: e.background_image
                }
        });
        return infoApiGames
    } catch (err) {
        console.log(err.message)
    }
};

// Traigo todos los juegos de la DB
const getDbGames = async () => {

    let infoDbGames = await Videogame.findAll({ 
        include: {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [] }
        }
    })
    return infoDbGames = infoDbGames.map(e => ({
        id: e.id, 
        name: e.name, 
        img: e.img, 
        rating: e.rating,
        platforms: e.platforms, 
        genres: e.genres.map(e => e.name),
        released: e.released
    }))
};

//
const getAllGames = async (req, res, next) => {

    const { name } = req.query;
    
    const api = await getApiGames();
    const db = await getDbGames();
    const allInfo = db.concat(api);   
    const urlSearchName = `${URL_API}/games?key=${API_KEY}&search=${name}`;

    try {
        if(name) {
            let getApiByName = (await axios(urlSearchName))
                .data.results.slice(0,15).map(e => {
                    return {
                        id: e.id, // desde el front voy a acceder como el nombre de la propiedad
                        name: e.name,
                        img: e.background_image,
                        rating: e.rating,
                        genres: e.genres.map(g => g.name),
                        platforms: e.platforms.map(p => p.platform.name)
                    }
            });
            let getDbByName = db.filter(e => e.name.toUpperCase().includes(name.toUpperCase()))
            let getGameByName = getDbByName.concat(getApiByName)
            if (getGameByName.length === 0) {
                res.status(404).send({ error: err.message });
            } else {
                res.send(getGameByName);
            }
        } else {
            res.send(allInfo);
        }
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
};


module.exports = { getAllGames,};