const { Router } = require('express');
const router = Router();
const { getAllGames } = require('../controllers/gamesControllers');


router.get('/', getAllGames);

module.exports = router;