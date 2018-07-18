/**
 * Created by bhuang on 12/4/17.
 * Holds all the routes needed.
 */

let express = require('express');
let router = express.Router();
let path = require('path');
let auth = require('./auth.js');
let products = require('./products.js');
let user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.get('/', (req, res) => {
    console.log('responding with index.html');
    res.sendFile(path.resolve('index.html'));
    //res.sendfile(dir + '/' + file, {'root': '../'});
});
router.post('/login', auth.login);
router.post('/api/user', user.service.create);
router.get('/api/users', user.service.getAll);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.service.getAll);
router.get('/api/v1/admin/user/:id', user.service.getOne);
router.post('/api/v1/admin/user/', user.service.create);
router.put('/api/v1/admin/user/:id', user.service.update);
router.delete('/api/v1/admin/user/:id', user.service.delete);

module.exports = router;
