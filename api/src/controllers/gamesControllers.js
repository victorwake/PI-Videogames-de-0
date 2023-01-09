require("dotenv").config();
const { URL_API, API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');




/*
Traigo todos los juegos de la API y tambien la busqueda 
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
                    release: e.released,
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

const getApiGamesName = async (name) => {
const apiUrl = await axios.get(`${URL_API}/games?key=${API_KEY}&search=${name}`)
const apiGames = await apiUrl.data.results.map(e => {
    return {
        id: e.id,
        name: e.name,
        description: e.description,
        release: e.released,
        rating: e.rating,
        platforms: e.platforms.map(p => p.platform.name),
        genres: e.genres.map(g => g.name),
        img: e.background_image
    }
})
return apiGames;
}

const getDbGames = async () => {
const dbGames = await Videogame.findAll({
    include: {
        model: Genre,
        attributes: ['name'],
        through: { // permite recuperar las propiedades de la tabla de combinación
            attributes: []
        }
    }
})
return dbGames;
}

const getAllGames = async () => {
const apiGames = await getApiGames();
const dbGames = await getDbGames();
const allGames = apiGames.concat(dbGames);
return allGames;
}


const allGames =  async (req, res) => {
const name = req.query.name;
const allGames = await getAllGames();
const dbGames = await getDbGames();
if (name) {
    getApiGamesName(name)
        .then((apiGamesName) => {
            const gamesName = apiGamesName.concat(dbGames)
            const gamesFilter = gamesName.filter(g => g.name.toLowerCase().includes(name.toLowerCase()))
            if (gamesFilter.length) {
                res.status(200).send(gamesFilter)
            } else {
                res.status(404).send('No games found')
            }
        })
} else {
    res.status(200).send(allGames)
}
};
/*
Fin de traer todos los juegos de la API y tambien la busqueda 
*/

module.exports = { allGames };