require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');


const { celebrate, Joi, errors } = require('celebrate');
const { NOT_FOUND, SERVER_ERROR } = require('./configs/constant');

const NotFoundError = require('./errors/not-found-err');

const app = express();
const limiter = require('./modules/rateLimit');
const { PORT, mongooseConfig, MONGOOSE_URL } = require('./secret');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routerMain = require('./routes/index');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

mongoose.connect(MONGOOSE_URL, mongooseConfig);

app.use(helmet());
app.use(requestLogger);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(11),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(11),
  }),
}), login);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Что то пошло не так, загрузка сервера  прервана');
//   }, 0);
// });

app.use(auth);

app.use('/', routerMain);


app.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || SERVER_ERROR });
  next();
});

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT);
});
