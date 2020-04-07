---
title: Nodejs Callback Event
date: 2020-03-26 13:59:13
tags: node
categories: node
---

## 回调模式

回调模式很好地解决了异步的问题，但是注意回调中不要同步异步混用

eg:

```javascript
const fs = require('fs');

const cache = {};

function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    callback(cache[filename]); // not safe
  } else {
    fs.readFile(filename, 'utf-8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  consistentReadAsync(filename, value => {
    listeners.forEach(listener => listener(value));
  });

  return {
    onDataReady: listener => listeners.push(listener)
  };
}

const reader1 = createFileReader('db.json');
reader1.onDataReady(data => {
  console.log('First call data: ' + data.substring(0, 2));

  const reader2 = createFileReader('db.json');
  // will not call listeners
  reader2.onDataReady(data => {
    console.log('Second call data: ' + data.substring(0, 2));
  });
});
```

### Solution

```javascript
function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    process.nextTick(() => callback(cache[filename])); // not safe
  } else {
    fs.readFile(filename, 'utf-8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}
```

## EventEmitter

`EventEmitter` 是 `Nodejs` 中观察者模式的实现

eg:

```javascript
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class FindPattern extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    this.files.forEach(file => {
      fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }

        this.emit('fileread', file);

        let match = null;

        if ((match = content.match(this.regex))) {
          match.forEach(elem => this.emit('found', file, elem));
        }
      });
    });

    return this;
  }
}

const findPatternObj = new FindPattern(/\{/);
findPatternObj
  .addFile('db.json')
  .find()
  .on('found', (file, match) =>
    console.log(`Matched: \n file: ${file}\n match: ${match}`)
  );
```
