// To define routes for client request,             //Create routes folder and router.js file


//import express
const express = require('express')
//import product controller
const productController= require('../controllers/productController')
// import wislist controller
const wishlistController=require('../controllers/wishlistController')
// import cart controller
const cartController=require('../controllers/cartController')

//Using express create an object for router class inorder to setup path
const router = new express.Router()

//Resolving client requests
//api - getallproduct request 
router.get('/products/all-products',productController.getallproducts)

//api - get particular product
router.get('/products/view-product/:id',productController.viewProduct)

//api - post wishlist product
router.post('/wishlist/add-to-wishlist',wishlistController.addtoWishlist)

//api - get wishlist items
router.get('/wishlist/get-wishlist',wishlistController.getWishlistitems)

//api - remove wishlist item
router.delete('/wishlist/remove-wishlist-item/:id',wishlistController.removeWishlistitems)

//api - add to cart
router.post('/cart/add-to-cart',cartController.addtocart)

//api - get cartitems
router.get('/cart/get-cart',cartController.getcartitems)

// api - remove cart-item
router.delete('/cart/remove-cart-item/:id',cartController.removecartitems)

// api - increment cart item count for button
router.get('/cart/increment-count/:id',cartController.incrementcount)

//api - decrement cart item
router.delete('/cart/decrement-count/:id',cartController.decrementcount)

//export router
module.exports = router 