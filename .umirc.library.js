export default {
	esm: 'rollup',
	cjs: 'rollup',
	umd: {
		name: 'NJTLog', // 指定挂载全局的对象名称
		minFile: true // umd同时生成压缩的min版本
	}
}