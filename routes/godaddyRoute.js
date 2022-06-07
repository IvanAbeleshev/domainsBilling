const Router = require('express');
const router = new Router();
const godaddyController = require('../controllers/godaddyController');

router.post('/addAccount', godaddyController.addEntry);
router.get('/getLastRezult', godaddyController.requestGetLastDataOfGodaddyDomains);

module.exports = router;