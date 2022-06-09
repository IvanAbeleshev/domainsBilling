const Router = require('express');
const router = new Router();
const namecheapController = require('../controllers/namecheapController');

router.post('/addAccount', namecheapController.addEntry);
router.get('/getLastRezult', namecheapController.requestGetLastDataOfNamecheapDomains);

module.exports = router;