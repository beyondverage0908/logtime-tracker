
module.exports = {
	log: function(times) {
		const TIMES = times || 1000
		console.time('z1')
		let all = 0
		for(let i = 0; i < TIMES; i++) {
			let start = Date.now()
			let end = Date.now()
			all += end - start
		}
		console.timeEnd('z1')
	}
}