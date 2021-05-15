
var User = require('./user')

module.exports = {
	log: function(times) {
		const TIMES = times || 1000
		console.time('z1')
		var sum = 0
		for(let i = 0; i < TIMES; i++) {
			const user = new User('xiaoli')
			user.setAge(18)

			// var d1 = Date.now()
			// var d2 = Date.now()
			// sum += d2 - d1
		}
		console.timeEnd('z1')
	}
}