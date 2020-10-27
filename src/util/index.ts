interface Info{
  code?:number;
  data:any;
  msg:string;
}

// 响应封装
class ResponseInfo{
  public code:number;
  public data:object;
  public msg:string;
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
  
  public setCode(code:number):void {
    this.code = code;
  }
  public getCode():number {
    return this.code;
  }
  public setData(data:any):void {
    this.data = data;
  }
  public getData():any {
    return this.data;
  }
  public setMsg(msg:string):void {
    this.msg = msg;
  }
  public getMsg():string {
    return this.msg;
  }
  public set(obj:Info):void {
    this.code = obj.code;
    this.data = obj.data;
    this.msg = obj.msg;
  }
  public get():Info {
    return {
        code:this.code,
        data:this.data,
        msg:this.msg
    };
  }
}
export = new ResponseInfo();
