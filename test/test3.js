
var User = require('./user')

module.exports = {
	log: function(times) {
		const TIMES = times || 1000
		console.time('z1')
		var sum = 0
		var d3 = new Date().getTime()
		for(let i = 0; i < TIMES; i++) {
			// var d1 = new Date().getTime()

			const user = new User('xiaoli')
			user.setAge(18)

			// var d2 = new Date().getTime()
			// sum += d2 - d1
		}
		var d4 = new Date().getTime()
		console.log(sum, d4 - d3)
		console.timeEnd('z1')
	}
}