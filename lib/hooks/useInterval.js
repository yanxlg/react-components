"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function useInterval() {
  var timer = (0, _react.useRef)();
  var stop = (0, _react.useCallback)(function () {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, []);
  var start = (0, _react.useCallback)(
  /**
   *
   * @param handler {Function} 定时处理逻辑，不可变，如果实例根据状态变化需要调用stop后重新start
   * @param timeout {Number} 定时时长
   * @param execute {Boolean} 是否立即执行
   */
  function (handler, timeout, execute) {
    if (execute === void 0) {
      execute = true;
    }

    stop();
    execute && handler();
    timer.current = window.setInterval(handler, timeout);
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      stop();
    };
  }, []);
  return {
    /**
     *
     */
    start: start,
    stop: stop
  };
}

var _default = useInterval;
exports["default"] = _default;