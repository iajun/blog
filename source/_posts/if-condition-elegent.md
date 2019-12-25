---
title: Make if More Elegent
date: 2019-12-25 21:50:46
tags:
    - design patterns
    - strategy
---

转载于[掘金](https://juejin.im/post/5bdfef86e51d453bf8051bf8)

## 一维判断

### if else

```javascript
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = status => {
    if (status == 1) {
        sendLog('processing');
        jumpTo('IndexPage');
    } else if (status == 2) {
        sendLog('fail');
        jumpTo('FailPage');
    } else if (status == 3) {
        sendLog('fail');
        jumpTo('FailPage');
    } else if (status == 4) {
        sendLog('success');
        jumpTo('SuccessPage');
    } else if (status == 5) {
        sendLog('cancel');
        jumpTo('CancelPage');
    } else {
        sendLog('other');
        jumpTo('Index');
    }
};
```

### switch case

```javascript
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = status => {
    switch (status) {
        case 1:
            sendLog('processing');
            jumpTo('IndexPage');
            break;
        case 2:
        case 3:
            sendLog('fail');
            jumpTo('FailPage');
            break;
        case 4:
            sendLog('success');
            jumpTo('SuccessPage');
            break;
        case 5:
            sendLog('cancel');
            jumpTo('CancelPage');
            break;
        default:
            sendLog('other');
            jumpTo('Index');
            break;
    }
};
```

### object

```javascript
const actions = {
    '1': ['processing', 'IndexPage'],
    '2': ['fail', 'FailPage'],
    '3': ['fail', 'FailPage'],
    '4': ['success', 'SuccessPage'],
    '5': ['cancel', 'CancelPage'],
    default: ['other', 'Index']
};
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = status => {
    let action = actions[status] || actions['default'],
        logName = action[0],
        pageName = action[1];
    sendLog(logName);
    jumpTo(pageName);
};
```

### object -> map

```javascript
const actions = new Map([
    [1, ['processing', 'IndexPage']],
    [2, ['fail', 'FailPage']],
    [3, ['fail', 'FailPage']],
    [4, ['success', 'SuccessPage']],
    [5, ['cancel', 'CancelPage']],
    ['default', ['other', 'Index']]
]);
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = status => {
    let action = actions.get(status) || actions.get('default');
    sendLog(action[0]);
    jumpTo(action[1]);
};
```

## 二维判断

### if else

```javascript
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 * @param {string} identity 身份标识：guest客态 master主态
 */
const onButtonClick = (status, identity) => {
    if (identity == 'guest') {
        if (status == 1) {
            //do sth
        } else if (status == 2) {
            //do sth
        } else if (status == 3) {
            //do sth
        } else if (status == 4) {
            //do sth
        } else if (status == 5) {
            //do sth
        } else {
            //do sth
        }
    } else if (identity == 'master') {
        if (status == 1) {
            //do sth
        } else if (status == 2) {
            //do sth
        } else if (status == 3) {
            //do sth
        } else if (status == 4) {
            //do sth
        } else if (status == 5) {
            //do sth
        } else {
            //do sth
        }
    }
};
```

### map

```javascript
const actions = new Map([
    [
        'guest_1',
        () => {
            /*do sth*/
        }
    ],
    [
        'guest_2',
        () => {
            /*do sth*/
        }
    ],
    [
        'guest_3',
        () => {
            /*do sth*/
        }
    ],
    [
        'guest_4',
        () => {
            /*do sth*/
        }
    ],
    [
        'guest_5',
        () => {
            /*do sth*/
        }
    ],
    [
        'master_1',
        () => {
            /*do sth*/
        }
    ],
    [
        'master_2',
        () => {
            /*do sth*/
        }
    ],
    [
        'master_3',
        () => {
            /*do sth*/
        }
    ],
    [
        'master_4',
        () => {
            /*do sth*/
        }
    ],
    [
        'master_5',
        () => {
            /*do sth*/
        }
    ],
    [
        'default',
        () => {
            /*do sth*/
        }
    ]
]);
/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity, status) => {
    let action = actions.get(`${identity}_${status}`) || actions.get('default');
    action.call(this);
};
```

### object is also ok

```javascript
const actions = {
    guest_1: () => {
        /*do sth*/
    },
    guest_2: () => {
        /*do sth*/
    }
    //....
};
const onButtonClick = (identity, status) => {
    let action = actions[`${identity}_${status}`] || actions['default'];
    action.call(this);
};
```

### 拼成字符串不好，那就来对象吧

```javascript
const actions = new Map([
    [
        { identity: 'guest', status: 1 },
        () => {
            /*do sth*/
        }
    ],
    [
        { identity: 'guest', status: 2 },
        () => {
            /*do sth*/
        }
    ]
    //...
]);
const onButtonClick = (identity, status) => {
    let action = [...actions].filter(
        ([key, value]) => key.identity == identity && key.status == status
    );
    action.forEach(([key, value]) => value.call(this));
};
```

### 如果 1-4 的逻辑一样，怎么处理

```javascript
const actions = new Map([
    [
        { identity: 'guest', status: 1 },
        () => {
            /* functionA */
        }
    ],
    [
        { identity: 'guest', status: 2 },
        () => {
            /* functionA */
        }
    ],
    [
        { identity: 'guest', status: 3 },
        () => {
            /* functionA */
        }
    ],
    [
        { identity: 'guest', status: 4 },
        () => {
            /* functionA */
        }
    ],
    [
        { identity: 'guest', status: 5 },
        () => {
            /* functionB */
        }
    ]
    //...
]);
```

### 好像还是得写 4 个 function

```javascript
const actions = () => {
    const functionA = () => {
        /*do sth*/
    };
    const functionB = () => {
        /*do sth*/
    };
    return new Map([
        [{ identity: 'guest', status: 1 }, functionA],
        [{ identity: 'guest', status: 2 }, functionA],
        [{ identity: 'guest', status: 3 }, functionA],
        [{ identity: 'guest', status: 4 }, functionA],
        [{ identity: 'guest', status: 5 }, functionB]
        //...
    ]);
};
const onButtonClick = (identity, status) => {
    let action = [...actions()].filter(
        ([key, value]) => key.identity == identity && key.status == status
    );
    action.forEach(([key, value]) => value.call(this));
};
```

### 那正则大大来帮忙吧

```javascript
const actions = () => {
    const functionA = () => {
        /*do sth*/
    };
    const functionB = () => {
        /*do sth*/
    };
    return new Map([
        [/^guest_[1-4]$/, functionA],
        [/^guest_5$/, functionB]
        //...
    ]);
};
const onButtonClick = (identity, status) => {
    let action = [...actions()].filter(([key, value]) =>
        key.test(`${identity}_${status}`)
    );
    action.forEach(([key, value]) => value.call(this));
};
```

### 正则还有更厉害的本事呢

```javascript
const actions = () => {
    const functionA = () => {
        /*do sth*/
    };
    const functionB = () => {
        /*do sth*/
    };
    const functionC = () => {
        /*send log*/
    };
    return new Map([
        [/^guest_[1-4]$/, functionA],
        [/^guest_5$/, functionB],
        [/^guest_.*$/, functionC]
        //...
    ]);
};
const onButtonClick = (identity, status) => {
    let action = [...actions()].filter(([key, value]) =>
        key.test(`${identity}_${status}`)
    );
    action.forEach(([key, value]) => value.call(this));
};
```

## 总结

1. if/else
2. switch
3. 一元判断时：存到 Object 里
4. 一元判断时：存到 Map 里
5. 多元判断时：将 condition 拼接成字符串存到 Object 里
6. 多元判断时：将 condition 拼接成字符串存到 Map 里
7. 多元判断时：将 condition 存为 Object 存到 Map 里
8. 多元判断时：将 condition 写作正则存到 Map 里
