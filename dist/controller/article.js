"use strict";
// 文章
// 控制器
// 操作模型
const article = require("../model/article").Article;
// 封装响应数据头
const responseArticle = require("../util");
class articleClass {
    constructor() {
        this.getArticleList = this.getArticleList.bind(this);
    }
    /**
     * 获取文章数据列表
     */
    async getArticleList(ctx, next) {
        try {
            let { page, size } = ctx.request.query;
            page = Number(page) <= 0 ? 1 : Number(page);
            size = Number(size);
            // 获取分页数据
            let result = await article
                .find({})
                .skip((page - 1) * size)
                .limit(size);
            // 获取总条数
            let count = await article.countDocuments({});
            responseArticle.setData({ result, count });
            ctx.body = responseArticle.get();
        }
        catch (error) {
            responseArticle.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseArticle.get();
        }
    }
    /**
     * 根据user_id获取相应的文章数据
     */
    async getArticleByTargetName(ctx, next) {
        try {
            let { term, page, size } = ctx.query;
            page = Number(page) <= 0 ? 1 : Number(page);
            size = Number(size);
            let result = await article
                .find({ user_id: term })
                .skip((page - 1) * size)
                .limit(size);
            let count = await article.countDocuments({ user_id: term });
            responseArticle.setData({ result, count });
            ctx.body = responseArticle.get();
        }
        catch (error) {
            responseArticle.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseArticle.get();
        }
    }
    /**
     * 写入文章内容
     */
    async writeArticle(ctx, next) {
        try {
            let { user_id, content } = ctx.request.body;
            let Instance = new article({ user_id, content });
            let res = await Instance.save();
            responseArticle.setData(res);
            ctx.body = responseArticle.get();
        }
        catch (error) {
            responseArticle.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseArticle.get();
        }
    }
}
module.exports = new articleClass();
