---
title: binary-tree
date: 2020-01-10 20:27:31
categories: data-structrue
tags:
    - data-structrue
---

## 前序遍历

```javascript
// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let ret = [];
    function getVal(node) {
        if (node.val) {
            ret.push(node.val);
        }
        if (node.left) {
            getVal(node.left);
        }
        if (node.right) {
            getVal(node.right);
        }
    }
    if (root) {
        getVal(root);
    }
    return ret;
};
```
