---
title: Browser Cache
date: 2019-12-26 10:27:17
categories: browser
tags:
    - browser
---

今天做页面的时候，有个 `fetch` json 数据的过程，采用轮询的机制，5 秒一次，结果出现了数据更新不及时的问题，究其原因是浏览器的缓存导致的，当设置 `Cache-Control: no-cache` 之后，问题得以解决。

## 浏览器获取数据步骤

### 强缓存

浏览器发送请求前，根据请求头的 expires 和 cache-control 判断是否命中（包括是否过期）强缓存策略，如果命中，直接从缓存获取资源，并不会发送请求。如果没有命中，走协商缓存

### 协商缓存

浏览器发送请求，根据请求头的 last-modified 和 etag 判断是否命中协商缓存，如果命中，直接从缓存获取资源。如果没有命中，则进入下一步

### 获取服务端数据

强缓存和协商缓存都没命中，则获取服务端发送来的数据

{% img  /image/browser-cache/cache-process.png 500 %}

## 缓存流程

### 第一次发请求，没有缓存，从服务端获取

{% img  /image/browser-cache/robust-cache-first.png 500 %}

### 有缓存但是过期

{% img  /image/browser-cache/robust-cache-expired.png 500 %}

### 有缓存能使用，不发送请求

{% img  /image/browser-cache/robust-cache-ok.png 500 %}

## 缓存配置

1. **Cache-Control**（优先级高）
2. Expires = max-age + 请求时间

### Cache-Control

| 取值                             | 描述                                                             |
| -------------------------------- | ---------------------------------------------------------------- |
| **Public**                       | 所有内容都将被缓存（客户端和代理服务器都可缓存）                 |
| **Private**                      | 所有内容只有客户端可以缓存，`Cache-Control`的默认取值            |
| **no-cache**                     | 客户端缓存内容，但是是否使用缓存则需要经过**协商缓存**来验证决定 |
| **no-store**                     | 所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存         |
| **max-age=xxx (xxx is numeric)** | 缓存内容将在 xxx 秒后失效                                        |

**注：设置 `no-cache` 后，并不是不缓存，而是走协商缓存，不走强缓存**

## 从哪取缓存

{% img  /image/browser-cache/whereiscache.png 800 %}

## 其他请求头字段

### Last-Modified 和 If-Modified-Since

**流程:**

1. 浏览器发请求
2. 服务端在响应头中写入 `last-modified`
3. 浏览器缓存上述时间
4. 浏览器再次发请求，请求头携带 `if-modified-since` 字段，值为 `last-modified` 的值
5. 服务端比对修改时间和 `if-modified-since`
6. 如果没改变，返回 `302`

**存在的问题：**

1. 保存的时间以秒为单位，1s 内的多次修改捕捉不到
2. 若机器的设置不同读取时间不一致，就可能出现误差

### Etag 和 If-None-Match

如何生成 Etag：对资源内容使用抗碰撞散列函数 \| 使用最近修改的时间戳的哈希值 \| 版本号...

其中流程与 4.1 相同，`Etag` 对应于 `last-modified` ，`If-None-Match` 对应于 `if-modified-since`

## 总结

1. 打开网页，地址栏输入地址： 查找 `disk cache` 中是否有匹配。如有则使用；如没有则发送网络请求。
2. 普通刷新 (F5)：因为 TAB 并没有关闭，因此 `memory cache` 是可用的，会被优先使用(如果匹配的话)。其次才是 `disk cache`。
3. 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 `Cache-control:no-cache`(为了兼容，还带了 `Pragma:no-cache`),服务器直接返回 200 和最新内容。

{% img  /image/browser-cache/summary.png 800 %}
