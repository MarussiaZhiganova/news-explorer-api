const mongoose = require('mongoose');
const Article = require('../models/article');

const { ObjectId } = mongoose.Types;
const { INVALID_ID, NOT_YOUR_ARTICLE, ARTICLE_NOT_FOUND } = require('../configs/constant');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden -err');
const RequestError = require('../errors/error_req');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('owner')
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.createArticles = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch(next);
};


module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  if (!ObjectId.isValid(articleId)) {
    return (new RequestError(INVALID_ID));
  }
  return Article.findById(req.params.articleId).select('+ owner')
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.deleteOne(article)
            .then((articleRemove) => res.send({ remove: articleRemove }))
            .catch(next);
        } else {
          next(new ForbiddenError(NOT_YOUR_ARTICLE));
        }
      } else {
        next(new NotFoundError(ARTICLE_NOT_FOUND));
      }
    })
    .catch(next);
};
