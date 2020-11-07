const { Router } = require('express');

const controller = require('../controller/buyController');

const routes = Router();

routes.post('/buy', controller.create);

routes.get('/buys', controller.getAll);

module.exports = routes;
