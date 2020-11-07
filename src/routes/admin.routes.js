const { Router } = require('express');

const middleware = require('../middleware');

const controller = require('../controller/adminController');

const routes = Router();

routes.use(middleware);

routes.get('/', controller.main);

//Members CREATE/DELETE
routes.post('/member', controller.createMember);
routes.delete('/member', controller.deleteMember);

module.exports = routes;
