const { Router } = require('express');
const router = Router();
const { postGame, getGameById } = require('../controllers/gameControllers');
// const {  } = require('../controllers/gameControllers');


router.post('/', postGame);
router.get('/:id', getGameById);

module.exports = router;