import { useCallback, useEffect, useRef } from 'react';

function useInterval() {
  var timer = useRef();
  var stop = useCallback(function () {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, []);
  var start = useCallback(
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
  useEffect(function () {
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

export default useInterval;