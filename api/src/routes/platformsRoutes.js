const { Router } = require('express');
const { getDbPlatforms } = require('../controllers/platformsControllers')

const router = Router();

router.get('/', getDbPlatforms);


module.exports = router;