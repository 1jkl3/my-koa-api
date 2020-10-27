// 数据库连接
const mongoose = require("mongoose");

interface user {
  user_id: string;
  user_name: string;
  user_pass: string;
  avatar: string;
  token: string;
}
class DB {
  private static instance: DB;
  private constructor() {
    this.connect();
  }
  public static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
  // 数据库建立连接
  public connect() {
    mongoose.connect(
      "mongodb://localhost:27017/test",
      { useUnifiedTopology: true, useNewUrlParser: true },
      function (err: string) {
        if (err) {
          console.log(err);
        } else {
          console.log("连接成功");
        }
      }
    );
  }
}
module.exports = DB.getInstance();
