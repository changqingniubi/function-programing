/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-07-31 23:26:59
 * @LastEditTime: 2021-08-05 11:28:08
 * @LastEditors: changqing
 * @Usage: 
 */
//容器内部的值可能是一个空值,而外部函数未必有处理空值的机制，如果传入空值，很可能就会出错
//Maybe函子可以过滤空值,能过滤空值的函子被称为Maybe函子
//可以过滤空值
class Maybe{
    constructor(value){
        this.value = value;
    }
    //写一个类似静态工厂方法的of方法，用来返回生产我想要的实例
    static of(value){
        return new Maybe(value);
    }
    //如果它还有一个map方法，可以接收一个函数，返回值还是一个同类型的对象，它就是函子
    //会提供map方法，接入各种运算的逻辑，从而引起值的变形或者说变化 
    map(fn){
        return this.value?new Maybe(fn(this.value)):this;
    }
}
let r = Maybe.of(null)
.map(x=>x.toString())
console.log(r);
