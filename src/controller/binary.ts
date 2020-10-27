// 封装响应数据头
const ResponseInfo = require("../util/index");
class Binary {
  constructor() {
    this.upload = this.upload.bind(this);
  }
  // 上传文件
  public async upload(ctx: any, next: Function): Promise<Error | void> {
    try {
      const {
        images: { path },
      } = ctx.request.files;
      let filePath = path.substring(path.indexOf("file") - 1);
      ResponseInfo.set({ code: 200, data: {filePath}, msg: "success" });
      ctx.body = ResponseInfo;
    } catch (err) {
      ResponseInfo.set({ code: 500, data: error.message, msg: "fail:no" });
      ctx.body = ResponseInfo;
    }
  }
}
export = new Binary();
