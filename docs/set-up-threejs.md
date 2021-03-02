---
title: Set Up WebGL
date: 2020-01-12 20:45:28
categories: threejs
tags:
    - webgl
    - threejs
---

## setting up with the code

```javascript
var scene = new THREE.Scene(); // scene
// a few different cameras
var camera = new THREE.PerspectiveCamera(
    75, // field of view, the extent of the scene
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
); // camera

var renderer = new THREE.WebGLRenderer(); // renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x09ffd0 });

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
    console.log('animating');
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
```

### three things we need

scene, camera and renderer, so that we can render the scene with camera.

### What's Mesh?

This is an object that contains all the points (vertices) and fill (faces) of the cube

### why animate not setInterval?

requestAnimationFrame has a number of advantages, the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```
