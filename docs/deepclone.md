---
title: Deep Clone
date: 2020-04-07 22:56:28
tags: js
categories: js
---

> 各种数据类型的拷贝
>
> 注意循环引用

代码：

```javascript
function cloneArrayBuffer(val) {
  const ab = new ArrayBuffer(val.byteLength);
  new Uint8Array(ab).set(new Uint8Array(val));
  return ab;
}

function deepClone(val, hash = new WeakMap()) {
  if (!val) {
    return val;
  }
  if (hash.has(val)) return hash.get(val);
  const ctor = val.constructor;
  switch (ctor) {
    case RegExp:
      return new RegExp(val);
    case Error:
      return new Error(val.message);
    case Date:
      return new Date(val.getTime());
    case Function:
      return eval(`() => ${val.toString()}`)();
    case Symbol:
      return ctor(val.toString().replace(/^Symbol\((.*)\)$/, "$1"));
    case Map:
      return new Map([...val]);
    case Set:
      return new Set([...val]);
    case Array:
      return val.map((v) => {
        return deepClone(v, hash);
      });
    case Object:
      const obj = {};
      hash.set(val, obj);
      Object.keys(val).forEach((k) => {
        obj[k] = deepClone(val[k], hash);
      });
      return obj;
    case Int16Array:
    case Int32Array:
    case Int8Array:
    case Float32Array:
    case Float64Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case DataView:
      const ab = cloneArrayBuffer(val.buffer);
      return new ctor(ab, val.byteOffset, val.length);
    case ArrayBuffer:
      return cloneArrayBuffer(val);
    case Buffer:
      const buf = Buffer.allocUnsafe(val.length);
      val.copy(buf);
      return buf;

    default:
      return val;
  }
}
```

总结：

1. 使用了 `WeakMap`，解决了循环引用的问题
2. 对 `ArrayBuffer` 及 相关类型进行处理
3. 对 `Function` 进行处理，只有箭头函数才能 `eval`

思考：

1. 对原型链的属性怎么处理？
2. 对 `File`, `Blob` 对象有必要吗？