// 控制器
const user = require("../model").userEntity;
const articleInfo = require("../model/article").Article;
const code = require("../model").codeEntity;
//  token 操作
const tokenUser = require("../util/token");
// 封装响应数据头
const responseUser = require("../util");
// sha1 秘钥
const { PWD_ENCODE_STR } = require("../util/config");
// sha1加密算法
const sha1 = require("sha1");
// 防止xss攻击
const xss = require("xss");
class User {
    // 操作模型索引条件
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    // 登录用户
    async login(ctx, next) {
        try {
            let { user_id, user_pass } = ctx.request.body;
            // 使用sha1算法加密密码
            user_pass = sha1(sha1(user_pass + PWD_ENCODE_STR));
            // 生成唯一 token凭证
            let tokenTime = new Date().valueOf().toString();
            let access_token = await tokenUser.create_token(user_id + tokenTime);
            // 查询
            let result = await user.find({ user_id });
            if (result.length == 0) {
                throw new Error("用户名不存在！");
            }
            else if (result[0].user_pass != user_pass) {
                throw new Error("密码错误！");
            }
            // 更新token
            await user.updateOne({ _id: result[0]._id }, { $set: { access_token } });
            responseUser.setData({ _id: result[0]._id, user_id, access_token });
            ctx.body = responseUser;
        }
        catch (error) {
            responseUser.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseUser;
        }
    }
    // 注册用户
    async register(ctx, next) {
        try {
            let { user_id = "", user_name = "", user_pass = "", avatar = "", code_token = "", code = "", } = ctx.request.body;
            // 判断是否已经注册过了
            let isUserInfo = await user.find({ user_id });
            if (isUserInfo.length !== 0) {
                responseUser.set({
                    code: 500,
                    data: "用户已存在，请直接登录！",
                    msg: "fail:no",
                });
                ctx.body = responseUser;
                return;
            }
            // 验证验证码
            let isToken = await tokenUser.check_token_code({ code_token, code });
            if (!isToken.isVerify) {
                responseUser.set({ code: 500, data: isToken.msg, msg: "fail:no" });
                ctx.body = responseUser;
                return;
            }
            // 使用xss防止攻击
            user_name = xss(user_name);
            // 使用sha1算法加密密码
            user_pass = sha1(sha1(user_pass + PWD_ENCODE_STR));
            // 存入mongo
            let userInfo = new user({
                user_id,
                user_name,
                user_pass,
                avatar,
            });
            let res = await userInfo.save();
            let responseInfo = {
                _id: res._id,
                user_id: res.user_id,
                user_name: res.user_name,
                avatar: res.avatar,
            };
            responseUser.setData(responseInfo);
            ctx.body = responseUser;
        }
        catch (error) {
            responseUser.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseUser;
        }
    }
    // 查询用户
    async findUserById(ctx, next) {
        try {
            let params = ctx.request.query;
            let res = await user.find({ user_id: params.user_id });
            responseUser.setData(res);
            ctx.body = responseUser;
        }
        catch (error) {
            responseUser.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseUser;
        }
    }
    // 注销用户
    async logout(ctx, next) {
        try {
            let res = null;
            let _id = ctx.query.id;
            if (!_id) {
                throw new Error("缺少参数");
            }
            else {
                res = await user.findOneAndDelete({ _id });
                responseUser.setData(res);
                ctx.body = responseUser;
            }
        }
        catch (error) {
            responseUser.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseUser;
        }
    }
    /**
     * 获取用户个人信息
     */
    async getUserInfo(ctx, next) {
        try {
            let res = "";
            responseUser.setData(res);
            ctx.body = responseUser;
        }
        catch (error) {
            responseUser.set({ code: 500, data: error.message, msg: "fail:no" });
            ctx.body = responseUser;
        }
    }
}
var users = new User();
module.exports = users;
