const { Router } = require('express');
const router = Router();
const { postGame, getGameID, deleteGame } = require('../controllers/gameControllers');


router.get('/:id', getGameID);
router.post('/', postGame);
router.delete('/:id/delete', deleteGame)


module.exports = router;