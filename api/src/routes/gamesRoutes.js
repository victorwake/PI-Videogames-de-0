const { Router } = require('express');
const router = Router();
const { allGames } = require('../controllers/gamesControllers');


router.get('/', allGames);

module.exports = router;