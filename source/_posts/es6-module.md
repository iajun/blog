---
title: ES6 Modules
date: 2019-12-25 16:33:10
tags:
---

## 原始方法

### 闭包模块

```javascript
function Hello(name) {
    function greeting() {
        console.log(`Hello, ${name}!`);
    }

    return {
        greeting
    };
}

var { greeting } = Hello('Sharp');
var { greeting } = Hello('Sharp');
```

缺点：不适用于单例模块

### 单例模块

-   IIFE

```javascript
var me = (function Hello(name) {
    function greeting() {
        console.log(`Hello, ${name}!`);
    }

    return {
        greeting
    };
})('Sharp');
```

## es6 模块

-   基于文件的模块：一个文件一个模块
-   模块 API 为静态：之后无法补充
-   模块为单例：每次向其他模块导入这个模块的时候，得到的是对单例中心的引用
-   变量绑定：导出时的所有变量，哪怕是简单的字符串或者数字，都不是简单的引用或者值赋值，而是类似于指针的绑定

### 指针绑定

```javascript
// 1.js
export default {
    name: 'mod1'
};

// module.js
import m1 from './1.js';
m1.name = 'changed name';

// index.js
import './module.js';
import m1 from './1.js';
console.log(m1.name); // changed name
```
