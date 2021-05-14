# umi-library打包教程

简介：js组件开发过程中，需要进行打包，生成不一样平台支持代码。umi-library是基于rollup和babel封装文档功能的打包工具。

1. 初始化：

	`npm install umi-library --save-dev`

	or

	`yarn add umi-library -D`

2. 命令执行

	2.1 基于rollup的esm模式打包(默认使用rollup)

		`npx umi-lib build --esm`

	2.2 基于babel的esm模式打包

		`npx umi-lib build --esm babel`

	2.3 基于rollup的cjs模式打包

		`npx umi-lib build --cjs`
	
	2.4 基于babel的cjs模式打包

		`npx umi-lib build --cjs babel`
	
	2.5 基于rollup的umd模式打包

		`npx umi-lib build --umd foo`
	
	umd模式生成的包是给到浏览器通过script标签引用使用，需要给一个全局挂载的名称。此处示例为foo，方便后续在js中通过window.foo.xx()方式使用。如未给定挂载名称，则以当前项目名称作为全局挂载名。

3. 其他常见命令

	3.1 指定执行环境为node的esm模式打包（默认是执行环境为浏览器）

		`npx umi-lib build --esm --target node`

4. 通过内置配置文件
	
	可以通过配置文件`.umirc.library.js`指定打包命令参数，则不需要在使用打包命令的时候添加参数。适合对常见命令进行预制。

	
## 参考

1. [视频介绍](https://www.bilibili.com/video/av47853431) https://www.bilibili.com/video/av47853431
2. [npmjs文档](https://www.npmjs.com/package/umi-library)