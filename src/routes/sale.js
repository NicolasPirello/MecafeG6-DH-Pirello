const express = require('express')
const router = express.Router();
const saleController = require('../controllers/saleController.js')
const authMiddlewares = require('../middlewares/authMiddlewares');

router.post(
    '/',
    authMiddlewares.authMiddlewarePost,
    saleController.store
);

module.exports = router;