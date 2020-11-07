const { Router } = require('express');

const controller = require('../controller/authController');

const routes = Router();

routes.post('/authenticate', controller.authenticate);
routes.post('/register', controller.register);
routes.post('/setadmin', controller.setAdmin)

module.exports = routes;
