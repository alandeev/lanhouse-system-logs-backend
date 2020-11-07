const { Router } = require('express');

const middleware = require('../middleware');

const controller = require('../controller/adminController');

const memberRoutes = require('./admin.member.routes');
const buyRoutes = require('./admin.buy.routes');

const routes = Router();

//Middleware to intercept and verify if token is valid.
routes.use(middleware);

//Other subRoutes
routes.use('/', memberRoutes);
routes.use('/', buyRoutes);

//Routes Admin
routes.get('/', controller.index);

module.exports = routes;
