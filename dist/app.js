// import Router = require("koa-router");
const Koa = require("koa");
const app = new Koa();
const db = require("./db");
const statics = require("koa-static");
const error = require("koa-onerror");
const path = require("path");
const io = require("socket.io")(80);
const _token = require("./util/token");
// 异常中间件
error(app);
// 配置静态资源文件
app.use(statics(path.join(__dirname, "/static")));
// 视图资源
app.use(statics(path.join(__dirname, "/views")));
// 配置logger日志
app.use(require("koa-logger")());
// 配置响应数据json化
app.use(require("koa-json")());
// 配置post请求传回参数
app.use(require("koa-bodyparser")({ enableTypes: ["json", "form", "text"] }));
// 日志提示中间件
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 验证token中间件
app.use(_token.check_token);
// 首页api路由
const Index = require("./router/index");
// 配置路由添加
app.use(Index.routes(), Index.allowedMethods());
// socket
io.on("connection", (socket) => {
    var roomid = socket.handshake.query.roomid;
    // 加入分组
    socket.join('group' + roomid);
    io.sockets.in('group' + roomid).emit('event_name', "分组信息" + roomid);
    // 接受客户端传入的数据
    socket.on("message", (msg) => {
        // console.log(msg);
        socket.emit("ServerMsg", msg);
    });
    socket.on("about", (msg) => {
        console.log(msg);
        socket.emit("aboutEmit", msg);
    });
    socket.on("disconnect", () => {
        console.log("关闭");
    });
    // 全体广播
    io.emit("radio", "我是服务器传到客户端的广播数据，群发的哦！");
    // 发送到客户端的数据（第一个参数为key，第二个参数为value）  broadcast 给除了自己以外的客户端广播消息
    socket.broadcast.emit("event", "我的服务端的数据");
});
// 监听异常
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});
module.exports = app;
