import axios from "axios";

export const deleteGame = async id => {
    try {
        const res = await axios.delete('https://henry-games.onrender.com/game/' + id + '/delete');
        if (res.status === 201)
            console.log('Videogame deleted successfully');
    } catch (err) {
        return alert(err.message);
    }
};