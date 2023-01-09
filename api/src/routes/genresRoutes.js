const { Router } = require('express');
const router = Router();
const { getDbGenres } = require('../controllers/genresControllers');

router.get('/', getDbGenres);

module.exports = router;