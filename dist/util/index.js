// 响应封装
class ResponseInfo {
    constructor() {
        this.code = 200;
        this.data = null;
        this.msg = "success:ok";
        this.setCode = this.setCode.bind(this);
        this.getCode = this.getCode.bind(this);
        this.setData = this.setData.bind(this);
        this.getData = this.getData.bind(this);
        this.setMsg = this.setMsg.bind(this);
        this.getMsg = this.getMsg.bind(this);
        this.set = this.set.bind(this);
        this.get = this.get.bind(this);
        this.get();
    }
    setCode(code) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    setMsg(msg) {
        this.msg = msg;
    }
    getMsg() {
        return this.msg;
    }
    set(obj) {
        this.code = obj.code;
        this.data = obj.data;
        this.msg = obj.msg;
    }
    get() {
        return {
            code: this.code,
            data: this.data,
            msg: this.msg
        };
    }
}
module.exports = new ResponseInfo();
