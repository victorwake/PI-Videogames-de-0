import axios from "axios";

export const postGame = payload => {
    return axios.post('https://henry-games.onrender.com/game/', payload)
    .then(res => {
        if (res.status === 201) console.log('Videogame created successfully')
    })
    .catch(err => alert(err.message))
};



