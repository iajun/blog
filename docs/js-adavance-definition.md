---
title: Js Variables Pre-interpretation
date: 2020-03-31 21:52:52
tags: js
catagories: js
---

## 数据类型

- 基本数据类型
    1. number
    2. string
    3. boolean
    4. null
    5. undefined
    6. symbol
- 引用数据类型
    1. object
    2. array
    3. /\\.$/
    4. Date

## js 内存分类

1. 栈内存 - 用来提供代码执行的环境（作用域）
2. 堆内存 - 用于存储数据

- 基本数据类型，变量存在于栈中，变量名对应真实值
- 引用数据类型，变量名存在于栈中，变量名代表的是一个堆内存地址，此内存地址中存有值
- 对于函数，函数名是一个堆内存地址，此内存地址中存有函数的code字符串

## 预解释

### `js`执行阶段:

js代码的执行可以分为两个阶段:

1. 声明阶段
2. 定义阶段

### 预解释

1. 有`var`或者`function`关键字定义的变量会进行预解释
2. `var`只进行声明提升，不会进行定义(赋值)， 但`function`会进行声明加定义
3. 对于重复定义，预解释只发生一次，但是定义会发生多次
2. 预解释是在`js`执行前，相对于当前的作用域的
3. 对于 `let`、`const` 关键字声明的变量不会进行预解释
4. 在预解释阶段，`function` 不仅会进行作用域提升，而且会进行赋值
5. 自执行函数不进行预解释

### eg

1. 预解释

```javascript
console.log(num); // undefined
console.log(obj); // undefined

var num = 12;
var obj = {};

console.log(num); // 12
console.log(obj); // {}
```

2. 与条件无关

```javascript
console.log(total); // undefined

if (!(`total` in window)) {
    var total = 6;
}

console.log(total); // undefined
```

3. 只与等号左边有关
```javascript
a(); // ReferenceError

var a = function() {
    alert('hello world!');
}
```

4. `return` 后面的代码依旧会被预解释

```javascript
function fn() {
    console.log(num); // undefined

    return function() {
        console.log(num) // undefined
    }

    alert(); // 不执行
    var num = 9;
}
```

5. 重复定义

```javascript
foo(); // 2

function foo() {
    console.log(1);
}

foo(); // 2

var foo = 'haha';

foo (); // ReferenceError

function foo() {
    console.log(2);
}

foo();
```
对应的作用域提升和变量存储如下图：

{% img /image/js-advance-definition/1.png %}
{% img /image/js-advance-definition/2.png %}
{% img /image/js-advance-definition/3.png %}
