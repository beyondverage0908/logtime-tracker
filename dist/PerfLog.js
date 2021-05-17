'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var version = "1.0.2";

function getGlobal() {
  var gbl = undefined;

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    gbl = global;
  } else {
    gbl = window;
  }

  return gbl;
}
/**
 * 全局对象key的定义
 */


var NJ_TIME_TRACKER = '_NJ_TIME_TRACKER';
var NJ_TIME_TRACKER_ENABLE_KEY = '_NJ_TIME_TRACKER_ENABLE';
var NJ_TIME_TRACKER_ENABLE = false;
var DEFAULT_KEY = '_DEFAULT_KEY';
var DEFAULT_KEY_OBJ = {
  running: false,
  duration: 0,
  frequency: 0,
  startUnix: 0,
  endUnix: 0
};

var Log = /*#__PURE__*/function () {
  function Log() {
    _classCallCheck(this, Log);

    var global = getGlobal();

    if (!global[NJ_TIME_TRACKER]) {
      global[NJ_TIME_TRACKER] = _defineProperty({}, DEFAULT_KEY, _objectSpread2({}, DEFAULT_KEY_OBJ));
      global[NJ_TIME_TRACKER_ENABLE_KEY] = NJ_TIME_TRACKER_ENABLE;
    }

    this.isEnable = global[NJ_TIME_TRACKER_ENABLE_KEY];
    this.tracker = global[NJ_TIME_TRACKER];
    this.version = version;
  }

  _createClass(Log, [{
    key: "getAllKey",
    value: function getAllKey() {
      return this.tracker && Object.keys(this.tracker);
    }
  }, {
    key: "haveKey",
    value: function haveKey(key) {
      return !!this.tracker[key];
    }
  }, {
    key: "createKey",
    value: function createKey(key) {
      this.tracker[key] = _objectSpread2({}, DEFAULT_KEY_OBJ);
    }
  }, {
    key: "setLog",
    value: function setLog(key, log) {
      this.tracker[key] = log;
    }
  }, {
    key: "getLog",
    value: function getLog(key) {
      return this.tracker[key];
    }
  }, {
    key: "enable",
    value: function enable(flag) {
      if (flag === undefined) {
        console.info('---调用enable方法没有入参，默认不启动日志统计');
      }

      var global = getGlobal();
      global[NJ_TIME_TRACKER_ENABLE_KEY] = !!flag;
      this.isEnable = global[NJ_TIME_TRACKER_ENABLE_KEY];
    }
  }, {
    key: "start",
    value: function start() {
      if (!this.isEnable) return;
      var keys = Array.prototype.slice.call(arguments);
      if (!keys.length) keys = [DEFAULT_KEY];

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (!this.haveKey(key)) {
          this.createKey(key);
        }

        var log = this.getLog(key);

        if (!log.running) {
          log.running = true;
          log.frequency += 1;
          log.startUnix = new Date().getTime();
        }
      }
    }
  }, {
    key: "end",
    value: function end() {
      if (!this.isEnable) return;
      var keys = Array.prototype.slice.call(arguments);
      if (!keys.length) keys = [DEFAULT_KEY];

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (!this.haveKey(key)) {
          console.log("---\u6CA1\u6709\u542F\u52A8\u7EDF\u8BA1key: ".concat(key, " "));
          continue;
        }

        var log = this.getLog(key);

        if (!log.running) {
          console.log("---\u6CA1\u6709\u542F\u52A8\u7EDF\u8BA1key: ".concat(key, " "));
          continue;
        }

        log.running = false;
        log.endUnix = new Date().getTime();
        var gapUnix = log.endUnix - log.startUnix;

        if (gapUnix) {
          log.duration = log.duration + gapUnix;
        } // this.setLog(key, log)

      }
    }
  }, {
    key: "stat",
    value: function stat() {
      if (!this.isEnable) return;
      var keys = Array.prototype.slice.call(arguments); // if (!keys.length) keys = [DEFAULT_KEY]

      if (!keys.length) keys = this.getAllKey();
      var tableConsoleData = [];

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (!this.haveKey(key)) {
          console.log("--->\u6CA1\u6709\u542F\u52A8\u7EDF\u8BA1key: ".concat(key, " "));
          continue;
        }

        var log = this.getLog(key); // console.log(`${key}: ${log.duration}ms ${log.frequency}次`)

        var tdata = {
          label: key,
          'duration(ms)': log.duration,
          'frequency(次)': log.frequency
        };
        tableConsoleData.push(tdata);
      }

      if (console.table && typeof console.table === 'function') {
        console.table(tableConsoleData);
      } else {
        console.log(tableConsoleData);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this = this;

      if (!this.isEnable) return;
      var keys = Array.prototype.slice.call(arguments);
      if (!keys.length) keys = [DEFAULT_KEY];
      keys.forEach(function (key) {
        if (!_this.haveKey(key)) {
          return;
        }

        _this.setLog(key, _objectSpread2({}, DEFAULT_KEY_OBJ));
      });
    }
  }]);

  return Log;
}();

var index = new Log();

module.exports = index;
