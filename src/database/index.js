const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database');
const { admin } = require('../config/config.json')

const User = require('../models/User');
const Member = require('../models/Member');
const Buy = require('../models/Buy');

const connection = new Sequelize(dbConfig);

User.init(connection);
Member.init(connection);
Buy.init(connection);

Member.associate(connection.models);
User.associate(connection.models);
Buy.associate(connection.models);

(async function createDefaultAccountAdmin(){
  if(!(await User.findOne({ where: { username: admin.username }})))
    await User.create(admin);
})()