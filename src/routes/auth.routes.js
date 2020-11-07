const { Router } = require('express');

const controller = require('../controller/authController');

const routes = Router();

routes.post('/authenticate', controller.authenticate);
routes.post('/register', controller.register);

module.exports = routes;
