module.exports = {
  // 用户密码加密字符串
  PWD_ENCODE_STR: "pawn_user_encode_str",
  // token 加密字符串,
  TOKEN_ENCODE_STR: "pawn_token_encode_str",
  // 排除不需要验证token路由
  URL_YES_PASS: ["/api/login", "/api/register","/api/upload"],
};
