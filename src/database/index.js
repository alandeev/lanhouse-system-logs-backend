const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database');

const User = require('../models/User');
const Member = require('../models/Member');

const connection = new Sequelize(dbConfig);

User.init(connection);
Member.init(connection);

User.associate(connection.models);
Member.associate(connection.models);
