// 文章模型
const mongooseArticle = require("mongoose");
const articleSchema = new mongooseArticle.Schema({
    user_id: String,
    content: String
});
const articleModel = mongooseArticle.model("Article", articleSchema);
exports.Article = articleModel;
