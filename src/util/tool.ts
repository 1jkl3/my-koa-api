export function dateFormat(date:Date):string{
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let S = date.getSeconds();
    let s = date.getMilliseconds();
    return y + '/' + coverage(M) + '/' + coverage(d) + '/' + h + '/' + coverage(m) + '/' + S + '/' + s;
}
// 补位
function coverage (number:number):string | number{
    if(number < 10){
        return "0" + number
    }
    return number;
}