/**
 * task函子
 * Task 函子通过类似 Promise 的 resolve 的风格来声明一个异步流程
 * FP 中除了容器（Container），也可以用上下文（Context）来称呼包裹了一个值的结构
 * Promise的任务是立刻执行的，而Task是在调用的时候才开始执行
 * 
 * 函数式编程 new对象
 * static of 内部也是要new对象
 * 类和new 对象都不是必须的
 * 还可以通过闭包保存值
 * 实现map
 * @param {*} url 
 * @returns 
 */
const Task = execute=>({
    execute,
    //fn(x)=1
    map:fn=>{
        return Task(resolve=>execute(x=>resolve(fn(x))))
    },
    flatMap:fn=>{
        return Task(resolve=>execute(x=>{
            return fn(x).execute((data)=>{
                return resolve(data);
            });
        }));
    }
})
function get(url) {
    if(url == 'data'){
        return Promise.resolve({ "code": 0, "userId": "1" });
    }else if(url === '1'){
        return Promise.resolve({userId:1,name:'xiaoming'});
    }
}

const request = url =>Task((resolve)=>get(url).then(resolve));

request('data')
.map(x=>x.userId)
.flatMap(request)
.map(x=>x.name)
.execute(data=>console.log(data));

