// 数据库连接
const mongoose = require("mongoose");
class DB {
    constructor() {
        this.connect();
    }
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
    // 数据库建立连接
    connect() {
        mongoose.connect("mongodb://localhost:27017/test", { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("连接成功");
            }
        });
    }
}
module.exports = DB.getInstance();
