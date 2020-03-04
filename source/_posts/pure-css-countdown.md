---
title: Pure Css Countdown
date: 2020-02-11 19:50:55
catagories: css
tags: css
---

## 使用纯 CSS 做一个 countdown

```html
<body>
    <div class="timer">
        <div class="digits seconds">
            <span>9</span>
            <span>8</span>
            <span>7</span>
            <span>6</span>
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
        </div>
        <div class="digits milliseconds">
            <span>9</span>
            <span>8</span>
            <span>7</span>
            <span>6</span>
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
        </div>
    </div>
</body>
```

```css
body {
    display: flex;
    height: 100vh;
}
.timer {
    margin: auto;
    height: 1em;
    font-size: 10em;
    text-align: center;
    overflow: hidden;
}
.digits {
    display: inline-block;
    margin-top: -0.2em;
}
.digits > span {
    display: block;
    height: 1em;
}
.seconds {
    animation: seconds 10s 1 step-end forwards;
}
.milliseconds {
    animation: milliseconds 1s 10 step-end forwards;
}
@keyframes seconds {
    0% {
        transform: translateY(0);
    }
    10% {
        transform: translateY(-1em);
    }
    20% {
        transform: translateY(-2em);
    }
    30% {
        transform: translateY(-3em);
    }
    40% {
        transform: translateY(-4em);
    }
    50% {
        transform: translateY(-5em);
    }
    60% {
        transform: translateY(-6em);
    }
    70% {
        transform: translateY(-7em);
    }
    80% {
        transform: translateY(-8em);
    }
    90% {
        transform: translateY(-10em);
        width: 0;
    }
    100% {
        transform: translateY(-10em);
        width: 0;
    }
}
@keyframes milliseconds {
    0% {
        transform: translateY(0);
    }
    10% {
        transform: translateY(-1em);
    }
    20% {
        transform: translateY(-2em);
    }
    30% {
        transform: translateY(-3em);
    }
    40% {
        transform: translateY(-4em);
    }
    50% {
        transform: translateY(-5em);
    }
    60% {
        transform: translateY(-6em);
    }
    70% {
        transform: translateY(-7em);
    }
    80% {
        transform: translateY(-8em);
    }
    90% {
        transform: translateY(-9em);
    }
    100% {
        transform: translateY(-9em);
    }
}
```
