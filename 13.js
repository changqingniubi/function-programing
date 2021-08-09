/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-07-31 23:26:59
 * @LastEditTime: 2021-08-05 19:37:30
 * @LastEditors: changqing
 * @Usage: 
 */

// 函子的值也可以是函子，这样会出现多层函子嵌套的情况
// Monad(单子[不可分割的实体]) 函子的作用是，总是返回一个单层的函子
// 它有一个flatMap方法，与map方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况

/**
 * 最重要一个概念
 * Monad 单子 不可分割的实体 没有嵌套
 */
 class Functor {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        return new Functor(value);
    }
    map(fn) {
        return new Functor(fn(this.value));
    }
}
//如果fn的返回值是一个函子，那么会出现一个递归嵌套的情况 计算和取值都很麻烦
let r1 = Functor.of('a')
  .map(x=>Functor.of(x+1))
  .map(x=>Functor.of(x.value+2))
  .map(x=>Functor.of(x.value+3))
console.log(r1.value.value);


// let r1 = Functor.of(
//     Functor.of(
//         Functor.of(1)
//     )
// );

//console.log(r1.value.value.value);


// let a1 = [1,2,3].map(item=>[item+1]);
// console.log(a1);
// console.log(a1[0][0]);


// let a2 = [1,2,3].flatMap(item=>[item+1]);
// console.log(a2);
// console.log(a2[0]);