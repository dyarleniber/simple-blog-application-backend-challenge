export default {
  port: process.env.PORT || 5050,
  mongodbUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/simple-blog-db',
};
