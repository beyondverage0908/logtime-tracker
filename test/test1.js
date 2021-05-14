var Log = require('../dist/NJTLog')

function logic1() {
	
}

function logic2() {

}

module.exports = {
	log: function(times) {
		const TIMES = times || 1000
		for(let i = 0; i < TIMES; i++) {
			Log.start('f1')
			Log.end('f1')
			logic1()
			logic2()
		}
		Log.console('f1')
		Log.clear('f1')
	}
}