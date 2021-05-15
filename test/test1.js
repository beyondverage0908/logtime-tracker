var Log = require('../dist/NJTLog')
var User = require('./user')

function logic1() {
	Log.start('f1')
	const user = new User('xiaoli')
	user.setAge(18)
	Log.end('f1')
}

function logic2() {
	Log.start('f2')
	Log.end('f2')
}
function logic3() {
	Log.start()
	Log.end()
}

module.exports = {
	log: function(times) {
		const TIMES = times || 1000
		// Log.start('all')
		for(let i = 0; i < TIMES; i++) {
			logic1()
			// logic2()
			// logic3()
		}
		// Log.end('all')
		for(let i = 0; i < 10000; i++) {
			Log.start('t1')
			Log.end('t1')
		}
		Log.console()
	}
}