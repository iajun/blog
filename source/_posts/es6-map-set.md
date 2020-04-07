---
title: Es6 Map Set
date: 2020-03-26 11:19:40
categories: es6
tags: es6
---

## normal Map

### 简单使用

```javascript
const profiles = new Map();

profiles.set('twitter', '@adalovelace');
profiles.set('facebook', 'adalovelace');
profiles.set('googleplus', 'ada');
profiles.size; // 3
profiles.has('twitter'); // true
profiles.has('youtube'); // false
profiles.delete('facebook'); // true
profiles.has('facebook'); // false
```

### 使用特殊 key

```javascript
profiles.set(
  () => 1,
  () => 2
);
profiles.set(/test$/, () => 'hello');
profiles.set({ name: 'Sharp' }, [2, 3, 3]);
```

## normal Set

在 `set` 中不允许有重复的值

```javascript
const set = new Set([0, 1, 2, 3]);
set.add(3);
set.size; // 4
set.delete(0); // true
set.has(0); // false
```

## WeakMap

`WeakMap` 和 `Map` 的差异：

- 只允许对象作为主键
- 可以被垃圾回收

eg:

```javascript
let o1 = {};
const map = new WeakMap();
map.set(o1, 'hello world');
map.get(o1); // 'hello world'
o1 = null; // now map doesn't has o1 => 'hello world' in it;
```

## WeakSet

- 只允许存储对象
- 可以被垃圾回收

eg:

```javascript
let o1 = {};
let o2 = {};
const set = new WeakSet([o1, o2]);
set.has(o1); // true
o1 = null; // now set doesn't o1 in it;
```
