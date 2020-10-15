const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { KEY } = require('../secret');
const UnauthorizedError = require('../errors/unauthorized-err');
const { AUTH } = require('../configs/constant');

const app = express();
app.use(cookieParser());


const auth = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return next(new UnauthorizedError(AUTH));
  }
  let payload;
  try {
    payload = jwt.verify(cookie, KEY);
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError(AUTH));
  }
  return next();
};

module.exports = auth;
