---
title: Js Design Patterns - Singleton
date: 2020-01-03 14:24:49
tags:
    - design patterns
    - singleton
categories:
    - design patterns
---

## 最基本的单例模式

```javascript
var Singleton = (function() {
    let instance;
    return function Window(name) {
        if (instance) {
            return instance;
        } else {
            this.name = name;
            return (instance = this);
        }
    };
})();

var w1 = new Singleton('instance1');
var w2 = new Singleton('instance2');

console.log(w1);
console.log(w1 === w2); // true
console.log(w2);
```

-   功能不统一，单例和构造函数混在一起

## 使用单例代理函数

```javascript
function ProxySingleton(Foo) {
    let instance;
    return function(...res) {
        if (instance) {
            return instance;
        } else {
            return (instance = new Foo(...res));
        }
    };
}

function Boy(name, age) {
    this.name = name;
    this.age = age;
}

function Gas(price) {
    this.price = price;
}

Gas = ProxySingleton(Gas);
Boy = ProxySingleton(Boy);

var g1 = new Gas(23);
var g2 = new Gas(13);
console.log(g1, g2, g1 === g2); // true

var sharp = new Boy('Sharp', 21);
var jack = new Boy('jack', 11);
console.log(sharp, jack, sharp === jack); // true
```
