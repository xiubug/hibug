<h1 align="center">Welcome to hibug 👋</h1>
<p>
  <img src="https://img.shields.io/npm/v/hibug.svg?style=flat" alt="npm version" />
  <img src="https://www.travis-ci.org/sosout/hibug.svg?branch=master" alt="Build Status" />
  <img src="https://img.shields.io/npm/dt/hibug.svg" alt="downloads" />
  <img src="https://img.badgesize.io/https://unpkg.com/hibug/lib/hibug.min.js?compression=gzip&style=flat-square&label=JS%20gzip%20size" alt="JS Gzip Size" />
  <img src="http://isitmaintained.com/badge/open/sosout/hibug.svg" alt="issue" />
  <img src="https://img.shields.io/codecov/c/github/sosout/hibug/dev.svg" alt="Coverage Status" />
</p>

## 简介

通过监听/主动捕获 `error` 以及性能信息，获取相关信息后执行特定操作(数据上传记录等)。

## 功能

### 错误捕获

可捕获的异常类型包括：

1. JavaScript执行错误
2. 资源加载错误
3. HTTP请求错误
4. 未catch处理的Promise错误

### 性能监控

可监控页面加载各个阶段所用时间、页面资源加载时间。

信息将于页面 `load` 事件时上报

### 错误上报

上报方法可自定义，上报时机分为：

1. 发生错误时立即上报错误
2. 页面卸载前上报。

### 性能信息上报

页面加载完成后上报

## Todo
- [ ] 页面HTTP请求性能监控
- [ ] 页面性能监控
- [ ] 页面资源加载性能监控
- [ ] sourcemap定位压缩代码具体错误位置
- [ ] 设置采集率
- [ ] 捕获websocket错误

## 原理

- 通过 `window.addEventListener`，可捕获 `JavaScript` 执行错误，资源加载错误，未catch处理的Promise错误
- 通过改写 `XMLHttpRequest` / `fetch` 实现监听 `HTTP` 请求错误

## 使用

#### script mode

```html
<script src="https://unpkg.com/hibug"></script>

<script>
  hibug.init({
    report(errorList) {
      // 上传错误至服务端
    }
  })
</script>
```

#### module mode (React)

1.安装

```sh
npm install hibug --save
```
如果想用 `yarn`
```sh
yarn add hibug
```

2.在 根组件文件中添加

```javascript
import hibug from 'hibug'

class Root extends React.Component {
  componentDidMount() {
    hibug.init({
      report(errorList) {
        // 上传错误至服务端
      }
    })
  }
}
```

## 主动捕获上报

针对一些特殊需求的错误 使用主动捕获(使用装饰器)

例如在 `react` 中

```javascript
import { caughtError } from 'hibug';

class Test extends React.Component {
  @caughtError // success
  send() {
    // ...
  }
}
```

请注意箭头函数使用 `caughtError` 捕获不到错误信息，例如

```javascript
import { caughtError } from 'hibug';

class Test extends React.Component {
  @caughtError // fail
  send = () => {
    // ...
  }
}
```

针对一些不能使用装饰器或自定义信息使用 `reportInfo`

```javascript
import { reportInfo } from 'hibug';

class Test extends React.Component {
  send() {
    try {
      // ...
    } catch(e) {
      reportInfo(e)
    }
  }
}
```

```javascript
import { reportInfo } from 'hibug';

class Test extends React.Component {
  hello() {
    reportInfo('hello')
  }
}
```
