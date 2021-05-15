const express = require('express');
const PostController = require('./controllers/PostController');
const UserController = require('./controllers/UserController');

const auth = require('./middlewares/auth');

const routes = express.Router();

//User
routes.get('/user', auth, UserController.all);
routes.get('/user/:id', auth, UserController.one);
routes.post('/user', UserController.save);
routes.post('/login', UserController.login);
routes.delete('/user/me', auth, UserController.delete);

//Post
routes.get('/post', auth, PostController.all);
routes.get('/post/search', auth, PostController.search);
routes.get('/post/:id', auth, PostController.one);
routes.post('/post', auth, PostController.save);
routes.put('/post/:id', auth, PostController.update);
routes.delete('/post/:id', auth, PostController.delete);

module.exports = routes;