const express = require('express')
const router = express.Router();
const apisController = require('../../controllers/api/apisController.js');

router.get(
    '/totalProducts',
    apisController.totalProducts
);

router.get(
    '/totalUsers',
    apisController.totalUsers
);

router.get(
    '/totalTypeGrindings',
    apisController.totalTypeGrindings
);

router.get(
    '/totalRolesUser',
    apisController.totalRolesUser
);

router.get(
    '/totalProductGrames',
    apisController.totalProductGrames
);

router.get(
    '/totalProductsTypeGrinding',
    apisController.totalProductsTypeGrinding
);

router.get(
    '/lastProductCreated',
    apisController.lastProductCreated
);

router.get(
    '/lastUserCreated',
    apisController.lastUserCreated
);

router.get(
    '/productsActives',
    apisController.productsActives
);

module.exports = router;