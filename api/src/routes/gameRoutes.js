const { Router } = require('express');
const router = Router();
const { postGame, getGameById, updateGameOk, deleteGame } = require('../controllers/gameControllers');
// const {  } = require('../controllers/gameControllers');


router.post('/', postGame);
router.get('/:id', getGameById);
router.delete("/:id/delete", deleteGame);
router.put("/", updateGameOk);

module.exports = router;