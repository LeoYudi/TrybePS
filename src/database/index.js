const sequelize = require('sequelize');

const dbConfig = require('../config/database');
const Post = require('../models/Post');
const User = require('../models/User');

const connection = new sequelize(dbConfig);

User.init(connection);
Post.init(connection);

User.associate(connection.models);
Post.associate(connection.models);

module.exports = connection;
