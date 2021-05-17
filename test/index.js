var PerfLog = require('../dist/PerfLog')

var T1 = require('./test1')
var T2 = require('./test2')
var T3 = require('./test3')

PerfLog.enable(true)

// console.log(PerfLog)

const times = 100000

T1.log(times)
T2.log(times)
T3.log(times)
