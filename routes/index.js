//main routes file
const Router = require('express');
const router = new Router();

//import other router as callback function
const godaddyRoute = require('./godaddyRoute')
const namecheapRoute = require('./namecheapRoute')

router.use('/godaddy', godaddyRoute);
router.use('/namecheap', namecheapRoute);

module.exports = router;