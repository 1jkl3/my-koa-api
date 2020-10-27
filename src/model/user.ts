// 用户模型
const mongooseUser = require("mongoose");
const userSchema = new mongooseUser.Schema({
  user_id: String,
  user_name: String,
  user_pass: String,
  avatar: {
    type: String,
    default: "",
  },
  access_token: {
    type: String,
    default: "",
  },
});
const codeSchema = new mongooseUser.Schema({
  code:String,
  code_token: {
    type: String,
    default: "",
  },
});
const userModel = mongooseUser.model("User", userSchema);
const codeModel = mongooseUser.model("Code", codeSchema);
exports.User = userModel;
exports.Code = codeModel;
