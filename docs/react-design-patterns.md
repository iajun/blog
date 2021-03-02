---
title: React Design Patterns
date: 2019-12-25 21:59:32
categories: react
tags:
    - react
    - design patterns
---

如何设计一个项目，如何划分模块，怎么样才可以提高项目的可维护性、可扩展性和可重用性？这是这段时间来我的 react 设计模式的一些理解。

## React 基础原则

```javascript
UI = f(data);
```

-   React 界面完全由数据驱动；
-   React 中一切都是组件；
-   props 是 React 组件之间通讯的基本方式。

## Q1: 秒表的实现？

{% img /image/react-design-patterns/2019-12-25-22-05-12.png  300   %}

### 实践 1

```javascript
class StopWatch extends React.Component {
    render() {
        //TODO: 返回所有 JSX
    }
}
```

### 实践 2

```javascript
class StopWatch extends React.Component {
    render() {
        const majorClock = this.renderMajorClock();
        const controlButtons = this.renderControlButtons();
        const splitTimes = this.renderSplitTimes();
        return (
            <div>
                {majorClock}
                {controlButtons}
                {splitTimes}
            </div>
        );
    }
    renderMajorClock() {
        //TODO: 返回数字时钟的 JSX
    }
    renderControlButtons() {
        //TODO: 返回两个按钮的 JSX
    }
    renderSplitTimes() {
        //TODO: 返回所有计次时间的 JSX
    }
}
```

有没有更好的办法?

### 聪明组件和傻瓜组件

-   保持接口小，props 数量要少；
-   根据数据边界来划分组件，充分利用组合（composition）；
-   把 state 往上层组件提取，让下层组件只需要实现为纯函数。

## 问题 2：重复的逻辑？

> 很多网站应用，有些模块都需要在用户已经登录的情况下才显示。比如，对于一个电商类网站，“退出登录”按钮、“购物车”这些模块，就只有用户登录之后才显示，对应这些模块的 React 组件如果连“只有在登录时才显示”的功能都重复实现，那就浪费了。

### 实践 1:

```javascript
const LogoutButton = () => {
  if (isLogin()) {
    return ...; // 显示”退出登录“的JSX
  } else {
    return null;
  }
};

const ShoppintCart = () => {
  if (isLogin()) {
    return ...; // 显示”购物车“的JSX
  } else {
    return null;
  }
};
```

### 更好的解决方案？

```javascript
const withLogin = (Component) => {
  const NewComponent = (props) => {
    if (getUserId()) {
      return <Component {...props} />;
    } else {
      return null;
    }
  }

  return NewComponent;
};

const LogoutButton = withLogin((props) => {
  return ...; // 显示”退出登录“的JSX
});

const ShoppingCart = withLogin(() => {
  return ...; // 显示”购物车“的JSX
});
```

### 高级组件的高级用法

```javascript
const withLoginAndLogout = (ComponentForLogin, ComponentForLogout) => {
    const NewComponent = props => {
        if (getUserId()) {
            return <ComponentForLogin {...props} />;
        } else {
            return <ComponentForLogout {...props} />;
        }
    };
    return NewComponent;
};

const TopButtons = withLoginAndLogout(LogoutButton, LoginButton);
```

### 链式调用高阶组件

```javascript
const X1 = withOne(X);
const X2 = withTwo(X1);
const X3 = withThree(X2);
const SuperX = X3;
```

使用工具函数 `compose`

```javascript
const hoc = compose(withThree, withTwo, withOne);
const SuperX = hoc(X);

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

### 高阶组件注意点

-   如果内层组件包含定制的静态函数，这些静态函数的调用在 React 生命周期之外，那么高阶组件就必须要在新产生的组件中增加这些静态函数的支持
-   高阶组件支持嵌套调用，这是它的优势。但是如果真的一大长串高阶组件被应用的话，当组件出错，你看到的会是一个超深的 stack trace，十分痛苦。
-   使用高阶组件，一定要非常小心，要避免重复产生 React 组件

```javascript
const Example = () => {
    const EnhancedFoo = withExample(Foo);
    return <EnhancedFoo />;
};
```

```javascript
const EnhancedFoo = withExample(Foo);

const Example = () => {
    return <EnhancedFoo />;
};
```

## 更好的方案？

### 使用 render-props 模式

```javascript
const Login = props => {
    const userName = getUserName();

    if (userName) {
        const allProps = { userName, ...props };
        return <React.Fragment>{props.children(allProps)}</React.Fragment>;
    } else {
        return null;
    }
};

<Login>{({ userName }) => <h1>Hello {userName}</h1>}</Login>;
```

### 不局限于 props.children

```javascript
const Auth = props => {
    const userName = getUserName();

    if (userName) {
        const allProps = { userName, ...props };
        return <React.Fragment>{props.login(allProps)}</React.Fragment>;
    } else {
        <React.Fragment>{props.nologin(props)}</React.Fragment>;
    }
};

<Auth
    login={({ userName }) => <h1>Hello {userName}</h1>}
    nologin={() => <h1>Please login</h1>}
/>;
```

## 高阶组件和 render-props 对比

-   高阶组件可以链式调用
-   render-props 具有更灵活的 props，复用性更强，其实就是依赖注入
-   能否使用最简单组件 => 能否 render-props => 能否高阶组件

## 问题 3： 传递数据？

{% img /image/react-design-patterns/2019-12-25-22-21-54.png  460   %}

### react v16.3.0 之前的实现

上级组件定义 context

```javascript
class ThemeProvider extends React.Component {
    getChildContext() {
        return {
            theme: this.props.value
        };
    }

    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}

ThemeProvider.childContextTypes = {
    theme: PropTypes.object
};
```

### 使用 context

```javascript
class Subject extends React.Component {
    render() {
        const { mainColor } = this.context.theme;
        return <h1 style={{ color: mainColor }}>{this.props.children}</h1>;
    }
}

Subject.contextTypes = {
    theme: PropTypes.object
};
```

### 纯函数组件使用 context

```javascript
const Paragraph = (props, context) => {
    const { textColor } = context.theme;
    return <p style={{ color: textColor }}>{props.children}</p>;
};

Paragraph.contextTypes = {
    theme: PropTypes.object
};
```

### 更轻的 api

#### 创建上下文对象

```javascript
const ThemeContext = React.createContext();
const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;
```

#### 使用上下文对象

```javascript
const Paragraph = (props, context) => {
    return (
        <ThemeConsumer>
            {theme => (
                <p style={{ color: theme.textColor }}>{props.children}</p>
            )}
        </ThemeConsumer>
    );
};
```

### 总结

-   为了避免依赖关系复杂，每个应用都不要滥用“上下文”，应该限制“上下文”的使用个数。

## 问题 4：Tabs

> 一个 Tabs 组件和 TabItem 组件，Tabs 是容器，TabItem 是一个一个单独的 Tab，一个时刻只有一个 TabItem 被选中

### 实现 1:

```javascript
<TabItem active={true} onClick={this.onClick}>One</TabItem>
<TabItem active={false} onClick={this.onClick}>Two</TabItem>
<TabItem active={false} onClick={this.onClick}>Three</TabItem>
```

### 实现 2:

```javascript
<Tabs>
    <TabItem>One</TabItem>
    <TabItem>Two</TabItem>
    <TabItem>Three</TabItem>
</Tabs>
```

#### 怎么去实现？

```javascript
const TabItem = props => {
    const { active, onClick } = props;
    const tabStyle = {
        'max-width': '150px',
        color: active ? 'red' : 'green',
        border: active ? '1px red solid' : '0px'
    };
    return (
        <h1 style={tabStyle} onClick={onClick}>
            {props.children}
        </h1>
    );
};
```

```javascript
};
class Tabs extends React.Component {
  state = {
    activeIndex: 0
  };

  render() {
    const newChildren = React.Children.map(
      this.props.children,
      (child, index) => {
        if (child.type) {
          return React.cloneElement(child, {
            active: this.state.activeIndex === index,
            onClick: () => this.setState({ activeIndex: index })
          });
        } else {
          return child;
        }
      }
    );

    return <Fragment>{newChildren}</Fragment>;
  }
}
```

## 总结

-   组合组件模式要解决的是这样一类问题：父组件想要传递一些信息给子组件，但是，如果用 props 传递又显得十分麻烦。
-   应用组合组件的往往是共享组件库，把一些常用的功能封装在组件里，让应用层直接用就行。在 antd 和 bootstrap 这样的共享库中，都使用了组合组件这种模式。
