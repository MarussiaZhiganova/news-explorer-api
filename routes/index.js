const routerMain = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');

routerMain.use('/users', usersRouter);
routerMain.use('/articles', articlesRouter);

module.exports = routerMain;
