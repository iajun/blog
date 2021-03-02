---
title: Regex
date: 2020-04-07 17:38:24
tags:
	- js
	- regex
categories: js

---

本文介绍 `js` 正则表达式的一些知识

## 正则匹配模式

### 全局模式

#### 举例

<img src="/image/regex/image-20200407181309420.png" alt="image-20200407181309420" style="zoom:53%;" />

去掉全局模式

<img src="/image/regex/image-20200407181349292.png" alt="image-20200407181349292" style="zoom:70%;" />

#### 总结

1. 全局模式影响匹配数，如果为全局模式，则尽可能多地贪婪匹配，否则只匹配第一个

### 单行模式

#### 举例

<img src="/image/regex/image-20200407195055837.png" alt="image-20200407195055837" style="zoom: 60%;" />

去掉单行模式

<img src="/image/regex/image-20200407195206339.png" alt="image-20200407195206339" style="zoom:70%;" />

#### 总结

1. 单行模式影响 `.` 的匹配，即是否匹配换行符

### 多行模式

> 多行模式
>
> ^　可以匹配字符串开头（字符串的开始位置），也可以匹配行的开头（即换行符\n之后的位置）
> $　可以匹配字符串结尾（字符串的结束位置）, 也可以匹配行的结尾（即换行符\n之前的位置）
>
> 否则
>
> ^　只能匹配字符串开头
> $　只能匹配字符串结尾

#### 举例

<img src="/image/regex/image-20200407180512399.png" alt="image-20200407180512399" style="zoom:60%;" />

去掉多行模式

<img src="/image/regex/image-20200407180316522.png" alt="image-20200407180316522" style="zoom:50%;" />

再比如如下的

<img src="/image/regex/image-20200407181013536.png" alt="image-20200407181013536" style="zoom:56%;" />

如果去掉多行模式

<img src="/image/regex/image-20200407181120275.png" alt="image-20200407181120275" style="zoom:58%;" />

#### 总结

1. 多行模式和单行模式没什么关系
2. 多行模式影响 ^ $ 的匹配
3. 单行模式影响 . 的匹配
4. 多行模式如果没有 ^ 或 $，则没有意义

### 忽略大小写模式

<img src="/image/regex/image-20200407195550037.png" alt="image-20200407195550037" style="zoom:56%;" />

### Unicode 模式

![image-20200407200105419](/image/regex/image-20200407200105419.png)

参见下面的 `js` 举例，`js`默认匹配 `unicode`，尽管 `RegExp.prototype.unicode = false` 

## Js 中的正则

### 原型属性

以 `reg = /\\.hello,world/igyum` 为例

```javascript
reg.flags // "giyum"
reg.source // "\.hello,world"
reg.multiline // true 多行模式 ---- m
reg.global // true 全局模式 ---- g
reg.dotAll // false .匹配换行符 ---- s
reg.sticky // true ---- y
reg.ignoreCase // true  ---- i
reg.unicode // false ---- u
reg.lastIndex // 目标字符串最近一次匹配的下一个索引位置
```

### Regex.prototype.lastIndex

```javascript
var re = /(hi)?/g;

console.log(re.exec("hi")); // ["hi", "hi"]
console.log(re.lastIndex);  // 2

console.log(re.exec("hi")); // ["", undefined]
console.log(re.lastIndex);  // 0
```

> 如果 `lastIndex` 大于字符串的长度，则 `regexp.test` 和 `regexp.exec` 将会匹配失败，然后 `lastIndex` 被设置为 0。

> 如果 `lastIndex` 等于字符串的长度，且该正则表达式匹配空字符串，则该正则表达式匹配从 `lastIndex` 开始的字符串。（then the regular expression matches input starting at `lastIndex`.）

> 如果 `lastIndex` 等于字符串的长度，且该正则表达式不匹配空字符串 ，则该正则表达式不匹配字符串，`lastIndex` 被设置为 0.。

> 否则，`lastIndex` 被设置为紧随最近一次成功匹配的下一个位置。

#### 总结

1. `exec`, `test` 每次匹配字符串一次，`lastIndex` 为匹配串的下一个字符的 `index`

### Regex.exec()

```javascript
/a/[Symbol.match]('abc'); // ["a", index: 0, input: "abc", groups: undefined]
// 与下面等效
/a/.exec('abc');
'abc'.match(/a/)
```

### Regex 命名分组

![image-20200407204306490](/image/regex/image-20200407204306490.png)



## 相关的 `Symbol ` 属性

### Symbol.match

```javascript
class A {
    [Symbol.match]() {
        return {
            hello: "world!"
        }
    }
}

"zi".match(new A()) // {hello: "world!"}

class MyRegExp extends RegExp {
    [Symbol.match](str) {
        const result = super[Symbol.match](str)

        return {
            hello: "world",
            result
        }
    }
  
    [Symbol.matchAll](str) {
      // ...
    }
  
    [Symbol.search] () {
      // ...
    }
  
    [Symbol.species]() {
        return RegExp;
    }
  
    [Symbol.replace]() {
        // ....
    }
  
    [Symbol.split]() {
      // ...
    }
}

"zi".match(new MyRegExp(/zi/))
// {hello: "world", result: Array(1)}
// hello: "world"
// result: ["zi", index: 0, input: "zi", groups: undefined]

new MyRegExp(/hh/) instanceof RegExp // true

```

