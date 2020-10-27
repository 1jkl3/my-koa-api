const router = require("koa-router")();
const contrl = require("../controller");
const colCode = require("../util/auth");
router.prefix("/api");
// 登录
router.post("/login", contrl.userApi.login);
// 注册
router.post("/register", contrl.userApi.register);
// 注销
router.get("/del", contrl.userApi.logout);
// 查询用户
router.get("/findUserById", contrl.userApi.findUserById);
// 发送验证码
router.get("/sendCode", colCode.create_code);
// 文章列表 （分页）
router.get("/articles", contrl.articleApi.getArticleList);
// 文章查询 （模糊）
router.get("/articleQuery", contrl.articleApi.getArticleByTargetName);
// 文章写入
router.post("/articleWrite", contrl.articleApi.writeArticle);
module.exports = router;
