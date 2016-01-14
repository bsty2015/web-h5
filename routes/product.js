var express = require('express'),
    ProductController = require('../controllers/productController'),
    router = express.Router();
var product = new ProductController();

router.get('/product/list', product.list);

router.get('/product/detail/:id', product.detail);

router.get('/product/assetdetail/:id', product.details);

module.exports = router;
