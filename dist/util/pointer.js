// this指针问题
// class BaseController{
//     resovle(){
//         return new Proxy(this,{
//             get(target:any,name:string):object{
//                 return target[name].bind(name)
//             }
//         })
//     }
// }
// module.exports = BaseController
