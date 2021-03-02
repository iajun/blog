---
title: Generator
date: 2019-12-25 14:30:58
categories: es6
tags: es6
---

## 生成器

### generator

```javascript
function* foo() {
    var x = 2,
        y = 3;
    yield x + y;
    console.log('hello');
    yield 200;
}
```

### yield 语句的值

由于调用第一个 next 时，并没有 `yield` 表达式等待完成，因此第一个 `next()` 传入的值会被直接丢弃

```javascript
function* foo() {
    var x = yield 1;
    var y = yield 2;
    console.log(x, y);
}

var it = foo();
console.log(it.next(2));
console.log(it.next(3));
console.log(it.next(4));

// x: 3, y: 4
```

### `yield` 表达式

```javascript
function* foo() {
    var arr = [yield 1, yield 2, yield 3];
    console.log(arr, yield 4);
}

var it = foo();
it.next();
it.next(10);
it.next(20);
it.next(30);
it.next(40);
// [10, 20, 30]  40
console.log(...foo());
// [undefined, undefined, undefined] undefined

var it2 = foo();
it2.next();
it2.next();
it2.next();
it2.next();
it2.next();
// [undefined, undefined, undefined] undefined
```

### 提前结束和提前终止

```javascript
function* foo() {
    yield 1;
    yield 1;
    yield 1;
    yield 1;
}

var it = foo();
console.log(it.next());
// 提前结束
it.return(200);
// 提前终止
try {
    it.throw('unknown error');
    console.log(it.next());
} catch (err) {
    //...
}
```

## 递归委托

### 委托给一个可迭代表达式

```javascript
function* g4() {
    yield* [1, 2, 3];
    return 'foo';
}

var result;

function* g5() {
    result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true },
// 此时 g4() 返回了 { value: "foo", done: true }

console.log(result); // "foo"
```

### 不具备 yield 表达式的委托不会暂停

```javascript
function* foo(x) {
    yield* foo(x + 1);
}

var it = foo(1); // ❌ 死循环
```

## 错误处理

### 由外向内和由内向外

```javascript
function* foo() {
    try {
        yield 1;
    } catch (err) {
        console.log(err);
    }

    yield 2;

    throw 'hello!';
}

var it = foo();
it.next();

try {
    it.throw('Hi!');

    it.next();

    console.log('never gets here!');
} catch (err) {
    console.log(err); // hello
}
```

### 多方向传播

```javascript
function* foo() {
    try {
        yield 1;
    } catch (err) {
        console.log(err);
    }

    yield 2;

    throw 'foo: e2';
}

function* bar() {
    try {
        yield* foo();

        console.log('never gets here');
    } catch (err) {
        console.log(err);
    }
}
var it = bar();

try {
    it.next();
    it.throw('e1');
    it.next();
} catch (err) {
    console.log('never gets here');
}

it.next();
```

## 应用

-   产生一系列值 （随机字符串，数据库查询返回的行上迭代等）
-   顺序执行的任务队列
