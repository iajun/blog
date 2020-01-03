---
title: Js Design Patterns - Iterator
date: 2020-01-03 15:44:17
tags:
    - design patterns
    - iterator
categories:
    - design patterns
---

## 自定义迭代器

自定义迭代器提供四个接口

```javascript
var obj = {
    [Symbol.iterator]() {
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                return {
                    value: 2,
                    done: false
                };
            },
            return(v) {
                // 结束后处理
                // 返回 IteratorResult
            },
            throw() {
                // 报错
                // 返回 IteratorResult
            }
        };
    }
};
```

## 使用迭代器模式装门

```javascript
const locks = ['B', 'C'];

function lockWithA() {
    if (locks.includes('A')) {
        console.log('正在使用A装门锁');
        return 'A';
    }
    return false;
}

function lockWithB() {
    if (locks.includes('B')) {
        console.log('正在使用B装门锁');
        return 'B';
    }
    return false;
}

function lockWithC() {
    if (locks.includes('C')) {
        console.log('正在使用C装门锁');
        return 'C';
    }
    return false;
}

function withIterator(...tasks) {
    const iterator = {
        tasks,
        idx: 0,
        [Symbol.iterator]() {
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next() {
                    let value,
                        done = false,
                        func;
                    if (!(func = iterator.tasks[iterator.idx++])) {
                        done = true;
                    } else if ((value = func())) {
                        done = true;
                    }
                    return {
                        value,
                        done
                    };
                }
            };
        }
    };
    return iterator;
}

[...withIterator(lockWithA, lockWithB, lockWithC)];
```
