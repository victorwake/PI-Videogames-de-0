const { Router } = require('express');
const router = Router();
const { postGame, getGameID, putGame, deleteGame } = require('../controllers/gameControllers');


router.get('/:id', getGameID);
router.post('/', postGame);
router.put("/", putGame);
router.delete('/:id/delete', deleteGame)


module.exports = router;