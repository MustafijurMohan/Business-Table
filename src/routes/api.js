const express = require('express')
const { ProductList } = require('../controllers/ProductController')
const router = new express.Router()



router.get('/product-list/:pageNo/:perPage/:searchKeyword', ProductList)


module.exports = router