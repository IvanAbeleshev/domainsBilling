//main routes file
const Router = require('express');
const router = new Router();

//import other router as callback function
const godaddyRoute = require('./godaddyRoute');
const namecheapRoute = require('./namecheapRoute');

const CommonController = require('../controllers/commonController');

router.use('/godaddy', godaddyRoute);
router.use('/namecheap', namecheapRoute);
router.get('/runCollection', CommonController.runCollection);

module.exports = router;