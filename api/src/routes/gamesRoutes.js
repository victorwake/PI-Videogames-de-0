const { Router } = require('express');
const router = Router();
const { allGames, getVideogamesfromDB } = require('../controllers/gamesControllers');


router.get('/', allGames);

module.exports = router;