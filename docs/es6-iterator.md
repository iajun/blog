---
title: Iterator
date: 2019-12-25 13:19:48
categories: es6
tags: es6
---

## 基础迭代器

```javascript
var arr = [1, 2, 3],
    it = arr[Symbol.iterator]();
console.log(it); // Array Iterator {}
console.log(it.next());

for (var v of arr) {
    console.log(v);
}

for (var v, res; (res = it.next()) && !res.done; ) {
    console.log(res.value);
}

// 以上两种方式等价
```

```javascript
var str = 'Hello World',
    it = str[Symbol.iterator]();
console.log(it); // StringIterator {}
console.log(it.next());
```

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

### Fibonacci 数列

```javascript
var Fib = {
    [Symbol.iterator]() {
        var n1 = 1,
            n2 = 1;
        return {
            [Symbol.iterator]() {
                return this;
            },

            next() {
                var current = n1 + n2;
                [n1, n2] = [current, n1];
                return { value: current, done: false };
            },

            return(v) {
                console.log('Fibonacci sequence abandoned!');
                return {
                    value: v,
                    done: true
                };
            }
        };
    }
};

var it = Fib[Symbol.iterator]();

for (var v of it) {
    console.log(v);
    if (v > 100) break;
}
```

### 迭代器队列

```javascript
var Queue = {
    tasks: [],
    [Symbol.iterator]() {
        return {
            [Symbol.iterator]() {
                return this;
            },

            next(...args) {
                var task;
                if ((task = Queue.tasks.shift())) {
                    return {
                        value: task(...args),
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }
};

Queue.tasks.push(
    function task1(x, y) {
        return x * y;
    },
    function task2(x, y) {
        return x - y;
    }
);

var it = Queue[Symbol.iterator]();
it.next(10, 20);
it.next(10, 20);
it.next(10, 20);
```

### 数字范围

```javascript
Object.defineProperty(Number.prototype, Symbol.iterator, {
    writable: true,
    enumable: false,
    configurable: false,
    value: function() {
        var done = false,
            top = +this,
            value,
            inc = top < 0 ? -1 : 1;
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (value === void 0) {
                    value = 0;
                } else {
                    value = value + inc;
                }

                if (value === top) {
                    done = true;
                }

                return {
                    value,
                    done
                };
            }
        };
    }
});
```

## 迭代器消耗

-   `for of` 语句
-   `...` 运算符
