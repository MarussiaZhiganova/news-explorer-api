module.exports.PORT = process.env.PORT || 3000;
module.exports.JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
module.exports.CODE = process.env.NODE_ENV !== 'production';

module.exports.KEY = (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'dev-secret';

module.exports.mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports.MONGOOSE_URL = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/mydb';
