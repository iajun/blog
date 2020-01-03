---
title: es6-class
date: 2019-12-26 14:18:21
categories: es6
tags:
    - es6
---

## super

```javascript
class Parent {
    constructor(name) {
        this.name = name;
    }
}

class Child extends Parent {
    constructor(name) {
        super(name);

        this.age = 19; // this 关键字必须在 super 之后

        super.constructor === Parent; // true
    }
}
```

## 使用 class 对原生类进行扩展

```javascript
class MyArray extends Array {
    last() {
        return this[this.length - 1];
    }
}
```

```javascript
class MyError extends Error {
    constructor(reason) {
        super(reason);
        this.oops = reason;
    }
}

throw new MyError('come on');
```

### 元属性 new.target

```javascript
class Parent {
    constructor() {
        console.log(new.target === Child);
    }
}

class Child extends Parent {
    constructor() {
        super();
        console.log(new.target.name);
        console.log(Child.name);
    }
}

var child = new Child();
// true
// Child
// Child
```
