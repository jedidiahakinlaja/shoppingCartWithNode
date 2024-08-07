const express = require('express');
const route = express.Router();
const userController = require('../controller/auth');
const cartController = require("../controller/shoppingCart")

route.post('/register',userController.postRegister);
route.post('/login',userController.postLogin);
route.use('/logout',userController.logOut);
route.use('/profile',userController.postProfile);

//cart
route.post('/postCart',cartController.postCart);


module.exports = route;