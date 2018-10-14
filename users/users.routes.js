'use strict';
var express = require('express');
var UserController = require ('../users/users.controller')


var router = express.Router();

router.get('/user/:id?',UserController.getUser);
router.get('/users',UserController.getUsers)
router.get('/getActive',UserController.getOneUserActive)
router.post('/user',UserController.createUser)
router.put('/user/:id',UserController.updateUser)
router.delete('/user/:id',UserController.deleteUser)
module.exports = router;
