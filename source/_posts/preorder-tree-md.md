---
title: preorder-tree.md
date: 2020-02-05 12:18:02
catagories: data-structure
tags:
    - tree
    - data-structure
---

**[树的遍历](https://leetcode-cn.com/explore/learn/card/data-structure-binary-tree/2/traverse-a-tree/7/)**

## 前序遍历

```javascript
// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
```

### M1: 递归

```javascript
var preorderTraversal = function(root) {
    let ret = [];
    function getPreorder(node) {
        ret.push(node.val);
        node.left && getPreorder(node.left);
        node.right && getPreorder(node.right);
    }
    root && getPreorder(root);
    return ret;
};
```

### M2: 循环

```javascript
var preorderTraversal = function(root) {
    const res = [];
    const stack = [];
    let cur = root;
    while (cur || stack.length > 0) {
        while (cur) {
            res.push(cur.val);
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        cur = cur.right;
    }
    return res;
};
```
