var Log = require('../dist/PerfLog')
var User = require('./user')

function logic1() {
	Log.start('f1', 'f2', 'f3')
	const user = new User('xiaoli')
	user.setAge(18)
	Log.end('f1', 'f2', 'f3')
}

function logic2() {
	Log.start('f2')
	// 
	Log.end('f2')
}
function logic3() {
	Log.start()
	Log.end()
}

module.exports = {
	log: function(times) {
		Log.start('sum')
		const TIMES = times || 1000
		for(let i = 0; i < TIMES; i++) {
			logic1()
			// logic2()
			// logic3()
		}
		Log.end('sum')
		Log.console()
	}
}