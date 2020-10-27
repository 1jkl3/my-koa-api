// 验证码
const BMP24 = require("gd-bmp").BMP24;
const token = require("./token");
const responseCode = require("../util");
const authModel = require("../model").codeEntity;
class authCode {
    constructor() {
        // 给方法绑定this指向
        this.create_code = this.create_code.bind(this);
        this.makeCapcha = this.makeCapcha.bind(this);
    }
    // 验证码创建
    async create_code(ctx, next) {
        try {
            let { code, img } = this.makeCapcha();
            let tokenInfo = token.create_token(code);
            let authInfo = new authModel({ code_token: tokenInfo, code });
            let res = await authInfo.save();
            if (res == null) {
                responseCode.set({ code: 500, data: [], msg: "fail:no" });
                return;
            }
            responseCode.set({
                code: 200,
                data: {
                    code_token: tokenInfo,
                    img: "data:image/bmp;base64," + img.getFileData().toString("base64"),
                },
                msg: "success:ok",
            });
            ctx.body = responseCode.get();
        }
        catch (error) {
            responseCode.set({ code: 500, data: "获取验证码失败，请重试！", msg: "fail:no" });
            ctx.body = responseCode.get();
        }
    }
    // 图片颜色
    rand(min, max) {
        return (Math.random() * (max - min + 1) + min) | 0; //特殊的技巧，|0可以强制转换为整数
    }
    // 图片及验证码的数据
    makeCapcha() {
        var img = new BMP24(100, 40);
        img.drawCircle(this.rand(0, 100), this.rand(0, 40), this.rand(10, 40), this.rand(0, 0xffffff));
        //边框
        img.drawRect(0, 0, img.w - 1, img.h - 1, this.rand(0, 0xffffff));
        img.fillRect(0, 0, 100, 40, 0x252632);
        // img.fillRect(this.rand(0, 100), this.rand(0, 40), this.rand(10, 35), this.rand(10, 35), this.rand(0, 0xffffff));
        img.drawLine(this.rand(0, 100), this.rand(0, 40), this.rand(0, 100), this.rand(0, 40), this.rand(0, 0xffffff));
        //return img;
        //画曲线
        var w = img.w / 2;
        var h = img.h;
        var color = this.rand(0, 0xffffff);
        var y1 = this.rand(-5, 5); //Y轴位置调整
        var w2 = this.rand(10, 15); //数值越小频率越高
        var h3 = this.rand(4, 6); //数值越小幅度越大
        var bl = this.rand(1, 5);
        for (var i = -w; i < w; i += 0.1) {
            var y = Math.floor((h / h3) * Math.sin(i / w2) + h / 2 + y1);
            var x = Math.floor(i + w);
            for (var j = 0; j < bl; j++) {
                img.drawPoint(x, y + j, color);
            }
        }
        var p = "ABCDEFGHKMNPQRSTUVWXYZ0123456789";
        var str = "";
        for (var i = 0; i < 4; i++) {
            str += p.charAt((Math.random() * p.length) | 0);
        }
        var fonts = [BMP24.font12x24, BMP24.font16x32];
        // var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
        var x = 15, y = 8;
        for (var i = 0; i < str.length; i++) {
            var f = fonts[(Math.random() * fonts.length) | 0];
            y = 8 + this.rand(-5, 5);
            img.drawChar(str[i], x, y, f, this.rand(0xaaaaaa, 0xffffff));
            x += f.w + this.rand(2, 8);
        }
        return { code: str, img };
    }
}
module.exports = new authCode();
// BaseCode.prototype
