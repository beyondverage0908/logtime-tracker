# 一. 前言

在日常开发中，不免存在着遇到性能问题。此时则需要一个工具针对特定的代码逻辑进行日志收集。方便定位何处耗时较长，以便于后续继续排查和调整。

# 二. console下的性能分析工具

说说js语言中自带console时间打点工具。

* **time([label])**:你可以启动一个计时器来跟踪某一个操作的占用时长。每一个计时器必须拥有唯一的名字，页面中最多能同时运行10,000个计时器。当以此计时器名字为参数调用`console.timeEnd()`时，浏览器将以毫秒为单位，输出对应计时器所经过的时间。
* **timeLog([label])**：可以阶段性的在控制台输出计时器的值，改计时器必须是已经通过console.time()启动。
* **timeEnd([label])**：停止一个通过`console.time()`启动的计时器，一旦停止，计时器所经过的时间会被自动输出到控制台。

由上述对console下time时间打点的工具的定义，console下的时间打点工具只能跟踪某一操作阶段的时间，而无法统计到具体某一个方法的时长。举例如下

```javascript
let sumLogic1 = 0
function logic1() {
  const start = new Date().getTime()
  // do something
  const end = new Date().getTime()
  sumLogic1 += end - start
}
// 上层抽象一个变量进行统计logic2执行的总时长
let sumLogic2 = 0
function logic2() {
  const start = new Date().getTime()
  // do something
  const end = new Date().getTime()
  sumLogic2 += end - start
}
// 方法入口
function main() {
  let times = 10000
  console.time('main')
  for (let i = 0; i < times; i++) {
    logic1()
    logic2()
  }
  console.timeEnd('main')
  // 输入统计每个逻辑分支的统计时长
  console.log('sum of logic1: ', sumLogic1)
  console.log('sum of logic2: ', sumLogic2)
}
```
如上，可以通过time api统计整个main阶段的耗时，但是不方便统计logic1，logic2分别执行时间总长度，则不方便定义性能问题是出现在logic1中还是logic2中。

在常见的分析中，只能通过抽象一个上层变量用于累计每次logic执行的时长。这种操作对于代码的侵入性比较大，针对代码的修改也比较频繁，毕竟代码的逻辑分支特别多，则存在需要将累计时长的变量抽象到顶层的情况。

# 三. NJTLog统计方式

NJTLog对这一分析过程进行了抽象，无需在逻辑代码中定义时间的统计逻辑，只需要声明式标记统计到某个label上。如下，我们可以将之前的统计逻辑修改如下。

```javascript
import Log from 'nj-perf-log'
function logic1() {
  Log.start('logic1')
  // do something
  Log.end('logic1')
}
// 上层抽象一个变量进行统计logic2执行的总时长
function logic2() {
  Log.start('logic2')
  // do something
  Log.end('logic2')
}
// 方法入口
function main() {
  let times = 10000
  Log.start('main')
  for (let i = 0; i < times; i++) {
    logic1()
    logic2()
  }
  Log.end('main')
  // 输出所有的时间统计
  Log.console()
}
```
# 四. 如何使用

在前端工程化的项目中直接使用npm安装依赖

```shell
npm install nj-perf-log
or
yarn add nj-perf-log
```
1. ESModule下使用
```javascript
import PerfLog from 'nj-perf-log'
// 启用
PerfLog.enable(true)
PerfLog.start('label')
/**
 * 逻辑部分
**/
PerfLog.end('label')
// 输出分析结果
PerfLog.stat('label')
```
2. CommonJS下使用
```javascript
var PerfLog = require('nj-perf-log')
// 启用
PerfLog.enable(true)
PerfLog.start('label')
/**
 * 逻辑部分
**/
PerfLog.end('label')
// 输出分析结果
PerfLog.stat('label'')
```
# 
3. 非工程化项目

在非工程化的项目，可以在[此处]([https://github.com/beyondverage0908/logtime-tracker/releases](https://github.com/beyondverage0908/logtime-tracker/releases?fileGuid=wTyChGHQyCWq3DJw))下载最新版本的js，并在在项目的head中引用。改js会暴露一个PerfLog对象，改对象的使用方式如上。

# 五. NJTLog Api

1. enable(flag: Boolean)

是否启用，默认不启用。该方法的启用与否需要在统计代码之前被调用

```javascript
import Log from 'nj-perf-log'
// 启用
Log.enable(true)
// 禁用
Log.enable(false)
```
2. **start([...label])**

开始一个统计，label用于当前统计的名字。label是一个可选入参，不传递默认记录到'_DEFAULT_KEY'上。也可以传递多个参数，一次性开始多个计时。

```javascript
// 开始一个默认计时器
Log.start()
// 开始一个指定label的计时器
Log.start('label1')
// 同时开始多个label的计时器
Log.start('label1', 'label2', 'label3')
```
## 
3. end([...label])

暂停当前阶段的一个统计，组件内部会保留当前label统计的数据。label是一个可选参数，不传递默认暂停'_DEFAULT_KEY'的统计。也可以传递多个参数，一次性暂停多个计时。

```javascript
// 暂停默认的计时器
Log.end()
// 暂停指定label的计时器
Log.end('label1')
// 暂停等多个label计时器
Log.end('label1', 'label2', 'label3')
```
## 
4. stat([...label])

控制台输出对应的日志，包括时间，单位毫秒，执行次数。label是个可选参数，不传则输出所有label统计。

```javascript
// 输出所有label计时器
Log.stat()
// 输出指定label的计时器
Log.stat('label1')
// 一次输出多个label的计时器
Log.stat('label1', 'label2', 'label3')
```
## 
5. clear([...label])

清空统计，清空指定label的统计。label是可选参数，不传则默认清空'_DEFAULT_KEY'的日志

```javascript
// 清空默认计时器
Log.clear()
// 清空指定label的计时器
Log.clear('label1')
// 清空指定label的计时器
Log.clear('label1', 'label2', 'label3')
```
