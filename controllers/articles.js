const mongoose = require('mongoose');
const Article = require('../models/article');

const { ObjectId } = mongoose.Types;

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden -err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.params.articleId })
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
    return (new NotFoundError('Статья не найдена'));
  }
  return Article.findById(req.params.articleId).select('+ owner')
    .then((article) => {
      if (article) {
        if (article.owner.toString() === req.user._id) {
          Article.findByIdAndRemove(req.params.articleId)
            .then((articleRemove) => res.send({ remove: articleRemove }))
            .catch(next);
        } else {
          next(new ForbiddenError('Это не ваша статья, не может быть удалена'));
        }
      } else {
        next(new NotFoundError('Статья не найдена'));
      }
    })
    .catch(next);
};
