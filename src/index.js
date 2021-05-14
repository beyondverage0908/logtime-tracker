function getGlobal() {
	let gbl = undefined
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		gbl = global
	} else {
		gbl = window
	}
	return gbl
}

/**
 * 全局对象key的定义
 */
const NJ_TIME_TRACKER = '_NJ_TIME_TRACKER'
const DEFAULT_KEY = '_DEFAULT_KEY'
const DEFAULT_KEY_OBJ = {
	running: false,
	duration: 0
}

class Log {
	constructor() {
		let global = getGlobal()
		if (!global[NJ_TIME_TRACKER]) {
			global[NJ_TIME_TRACKER] = {
				[DEFAULT_KEY]: {
					...DEFAULT_KEY_OBJ
				}
			} 
		}
		this.global = global
		this.tracker = global[NJ_TIME_TRACKER]
	}
	haveKey(key) {
		return !!this.tracker[key]
	}
	createKey(key) {
		this.tracker[key] = { ...DEFAULT_KEY_OBJ }
	}
	setLog(key, log) {
		this.tracker[key] = log
	}
	getLog(key) {
		return this.tracker[key]
	}
	start() {
		let keys = [...arguments]
		if (!keys.length) keys = [DEFAULT_KEY]
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			if (!this.haveKey(key)) {
				this.createKey(key)
			}
			const log = this.getLog(key)
			if (log.running) {
				return
			}
			log['startUnix'] = new Date().getTime()
		}
	}
	end() {
		let keys = [...arguments]
		if (!keys.length) keys = [DEFAULT_KEY]
		for (let i = 0; i < keys.length; i++) { 
			let key = keys[i]
			if (!this.haveKey(key)) {
				console.log(`---没有启动统计key: ${key} `)
				return;
			}
			const log = this.getLog(key)
			log.running = false
			log.endUnix = new Date().getTime()
			let gapUnix = log.endUnix - log.startUnix
			if (gapUnix) {
				log.duration = log.duration + gapUnix
			}
			this.setLog(key, log)
		}
	}
	console() {
		let keys = [...arguments]
		if (!keys.length) keys = [DEFAULT_KEY]
		for (let i = 0; i < keys.length; i++) {  
			let key = keys[i]
			if (!this.haveKey(key)) {
				console.log(`--->没有启动统计key: ${key} `)
				return;
			}
			const log = this.getLog(key)
			console.log(`${key}: ${log.duration}ms`)
		}
	}
	clear() {
		let keys = [...arguments]
		if (!keys.length) keys = [DEFAULT_KEY]
		keys.forEach(key => {
			if (this.haveKey(key)) {
				return;
			}
			this.setLog(key, DEFAULT_KEY_OBJ)
		})
	}
}

export default new Log()