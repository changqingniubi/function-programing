/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-07-31 23:26:59
 * @LastEditTime: 2021-08-05 11:32:30
 * @LastEditors: changqing
 * @Usage: 
 */
//Either 函子内部有两个值: 左值Left)和右值(Right),右值是正常情况下使用的值，左值是右值不存在时使用的默认值
//常用来设置默认值和处理异常
class Either{
    constructor(left,right){
        this.left = left;
        this.right = right;
    }
    //写一个类似静态工厂方法的of方法，用来返回生产我想要的实例
    static of(left,right){
        return new Either(left,right);
    }
    //如果它还有一个map方法，可以接收一个函数，返回值还是一个同类型的对象，它就是函子
    //会提供map方法，接入各种运算的逻辑，从而引起值的变形或者说变化 
    map(fn){
        return this.right?Either.of(this.left,fn(this.right)):Either.of(fn(this.left),this.right)
    }
    get value (){
        return this.right||this.left;
    }
}
//Either函子可以处理默认值
let response = {name:'zhangsan',gender:'女'};
let either = Either.of('男',response.gender)
            .map(x=>`性别:${x}`)
console.log(either.value);


function parseJSON(str){
  try{
    return Either.of(null,JSON.parse(str));
  }catch(error){
    return Either.of({error:error.message},null);
  }
}
console.log(parseJSON(`{"age":18}`).value);
console.log(parseJSON(`{age:18}`).value);