const { Router } = require('express');

const controller = require('../controller/memberController');

const routes = Router();

//Members CREATE/DELETE
routes.post('/member', controller.create);
routes.delete('/member/:member_id', controller.delete);

routes.get('/member/:member_id', controller.getOneMember);
routes.get('/members', controller.getAll);

module.exports = routes;