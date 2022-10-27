const express = require('express')
const router = express.Router();
const {check} = require('express-validator');
const path = require ('path');
const multer = require('multer');
const directionController = require('../controllers/directionController.js');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.get('/direction',authMiddlewares.authMiddleware, directionController.index);
router.post('/direction',authMiddlewares.authMiddlewarePost, directionController.store);
router.post('/direction/:id/delete',authMiddlewares.authMiddlewarePost, directionController.delete);
router.post('/direction/update',authMiddlewares.authMiddlewarePost, directionController.update);


module.exports = router;