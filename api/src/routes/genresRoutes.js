const { Router } = require('express');
const router = Router();
const { genres } = require('../controllers/genresControllers');

router.get('/', genres);

module.exports = router;