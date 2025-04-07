const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', indexController.Index);
router.get('/about', indexController.About);
router.get('/contact', isAuthenticated, indexController.Contact);
router.post('/contact', isAuthenticated, indexController.SubmitContact); //Handle form submissions

module.exports = router;
