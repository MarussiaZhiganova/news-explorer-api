const mongoose = require('mongoose');
const validator = require('validator');
const { BAD_REQUEST } = require('../configs/constant');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: BAD_REQUEST,
    },
    type: String,
    required: true,
  },
  image: {
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: BAD_REQUEST,
    },
    type: String,
    required: true,
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
