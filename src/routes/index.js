const { Router } = require('express');

const routes = Router();

const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');

routes.use('/', authRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;
