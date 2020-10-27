const jwt = require("jsonwebtoken");
const { TOKEN_ENCODE_STR, URL_YES_PASS } = require("./config");
const authModelToken = require("../model").codeEntity;
const userModelToken = require("../model").userEntity;
class TokenData {
    constructor() {
        this.url = "";
        this.create_token = this.create_token.bind(this);
        this.check_token = this.check_token.bind(this);
        this.check_token_code = this.check_token_code.bind(this);
    }
    // 创建token
    create_token(str) {
        return jwt.sign({ str }, TOKEN_ENCODE_STR, { expiresIn: "1m" });
    }
    // 验证是否登录 token
    async check_token(ctx, next) {
        try {
            // 解析url
            if (ctx.method == "GET") {
                this.url = ctx.url.substring(0, ctx.url.indexOf("?"));
            }
            else {
                this.url = ctx.url;
            }
            // 排除掉登录和注册接口
            if (!URL_YES_PASS.includes(this.url)) {
                if (this.url.indexOf("/api") !== -1) {
                    let access_token = ctx.header.authorization;
                    if (access_token) {
                        await jwt.verify(access_token, TOKEN_ENCODE_STR);
                    }
                    else {
                        ctx.body = { code: 403, data: "缺少token请求参数", msg: "fail:no" };
                    }
                }
            }
            else {
                await next();
            }
        }
        catch (error) {
            // console.log(error.message);
            ctx.body = { code: 403, data: "令牌过期，请重新登录！", msg: "fail:no" };
            ctx.status = 301;
            ctx.redirect("/api/login");
        }
    }
    // 验证验证码 token
    async check_token_code({ code_token, code, }) {
        try {
            code = code.toUpperCase();
            // 对验证码token解码 // 验证是否过期
            await jwt.verify(code_token, TOKEN_ENCODE_STR);
            // 没有过期查询并删除token
            let res = await authModelToken.findOneAndDelete({ code_token, code });
            // 没有找到 验证码错误
            if (res == null) {
                return {
                    isVerify: false,
                    msg: "验证码错误！",
                };
            }
            return {
                isVerify: true,
                msg: "验证码正确！",
            };
        }
        catch (error) {
            return {
                isVerify: false,
                msg: "验证码过期，请重新获取！",
            };
        }
    }
}
module.exports = new TokenData();
