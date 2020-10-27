"use strict";
// 封装响应数据头
const response = require("../util");
class mini extends response {
    constructor() {
        super();
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo() {
    }
}
module.exports = mini;
