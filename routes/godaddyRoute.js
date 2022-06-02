const Router = require('express');
const router = new Router();
const godaddyController = require('../controllers/godaddyController');

router.post('/addAccount', godaddyController.addEntry);

module.exports = router;