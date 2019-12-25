---
title: Smart String
date: 2019-12-25 12:47:15
categories: es6
tags:
    - es6
---

## 标签模板字符串

### eg: \`\${}\`

```javascript
var name = 'Sharp';
var intro = `My name is ${name}`; // "My name is Sharp"
```

### cpt: 实现

```javascript
function tag(strs, ...vals) {
    console.log(strs);
    // strs: [0: "hello ", 1: "", raw: ["hello ", ""]]
    // vals:["Sharp"]
    return strs.reduce(function(s, v, idx) {
        return s + (idx > 0 ? vals[idx - 1] : '') + v;
    }, '');
}

var name = 'Sharp';
tag`hello ${name}, welcome, ${name}`; // "hello Sharp, welcome, Sharp"
```
