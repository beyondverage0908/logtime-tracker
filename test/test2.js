
module.exports = {
	log: function(times) {
		const TIMES = times || 1000
		let all = 0
		for(let i = 0; i < TIMES; i++) {
			let start = new Date().getTime()
			let end = new Date().getTime()
			all += end - start
		}
		console.log(`ms: ${all}ms`)
	}
}