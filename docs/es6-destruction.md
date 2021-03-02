---
title: Destruction
date: 2019-12-25 11:31:58
categories: es6
tags: es6
---

fdsfs

## 解构赋值

### bse: coding background

```javascript
function foo() {
    return [1, 2, 3];
}

function bar() {
    return {
        x: 4,
        y: 5,
        z: 6
    };
}
```

### cpt: source -> target

```javascript
var { x: x0, y: y0 } = { x: 2, y: 4 };
```

结果：x0 为 2， y0 为 4

### cpt: 默认值

```javascript
var { a = 1, x, y: WW = 20 } = bar();
console.log(a, x, WW); // 1, 4, 5
```

### tip: 省略声明则需要括号

```javascript
var a, b, c, x, y, z;
[a, b, c] = foo(); // ✅
{ x, y, z } = bar(); // ❌ Uncaught SyntaxError: Unexpected token '='
({ x, y, z } = bar()); // ✅
```

### tip: 解构目标可以为对象属性

```javascript
var o = {};
({ x: o.x, y: o.y, z: o.z } = bar());
console.log(o); // {x: 4, y: 5, z: 6}
```

### tip: 解构使用计算属性

```javascript
var which = 'x';
({ [which]: o.x, y: o.y, z: o.z } = bar());
console.log(o); // {x: 4, y: 5, z: 6}
```

### tip: 对象 <-> 数组

```javascript
// 对象 ---------> 数组
var o1 = { a: 1, b: 2, c: 3 },
    a1 = [];
({ a: a1[0], b: a1[1], c: a1[2] } = o1);
console.log(a1); // [1, 2, 3]

// 数组 ---------> 对象
var a2 = [1, 2, 3],
    o2 = {};
[o2.x, o2.y, o2.z] = a2;
console.log(o2); // {x: 1, y: 2, z: 3}
```

### tip: 数组重排序

```javascript
var a1 = [3, 2, 1],
    a2 = [];
[a2[2], a2[1], a2[0]] = a1;
console.log(a2); // [1, 2, 3]
```

### tip: 交换变量

```javascript
var x = 10,
    y = 20;
[y, x] = [x, y];
console.log(x, y); // 20 10
```

### tip: 多次赋值

```javascript
var {
    a: { x: X },
    a: { x: Y },
    a
} = { a: { x: 1 } };
console.log(a, X, Y); // {x: 1} 1 1
```

### tip: 缺省为 undefined

```javascript
var x, y;
({ x } = bar());
[, y] = foo();

console.log(x, y); // 4 2
```

## 解构赋值表达式

解构赋值表达式的值为右侧变量的值

```javascript
var a, X, Y;
({
    a: { x: X },
    a: { x: Y },
    a
} = { a: { x: 1 } }); // { a: { x: 1 } }
```

```javascript
var o = { a: 1, b: 2 },
    a,
    b,
    p;

p = { a, b, c } = o;
p === o; // true
```

## 应用

### tip: 函数参数

```javascript
function foo([x = 100, y = 200], ...z) {
    console.log(x, y, z);
}

foo([1], 's'); // 1 200 ["s"]
```

### warn: 解构默认值和参数默认值

```javascript
function f1({ x = 10 } = {}, { y } = { y: 10 }) {
    console.log(x, y);
}
f1(); // 10 10
f1({}, {}); // 10 undefined
```

### tip: 默认值重组

```javascript
var defaults = {
    options: {
        remove: true,
        enable: false,
        instance: {}
    },
    log: {
        warn: true,
        error: true
    }
};

var config = {
    options: {
        remove: false,
        instance: null
    }
};

{
    let {
        options: {
            remove = defaults.options.remove,
            enable = defaults.options.enable,
            instance = defaults.options.instance
        } = {},
        log: { warn = defaults.log.warn, error = defaults.log.error } = {}
    } = config;

    config = {
        options: { remove, enable, instance },
        log: { warn, error }
    };
}
```

-   如果使用 `config.options.remove = (config.options.remove !== undefined) ? config.options.remove : defaults.options.remove` 一个个变量进行判断，则太过复杂
-   如果使用 Object.assign({}, defaults, config), 由于其浅复制的影响，可能会存在问题
-   此方法可以说比较实用
