import { useEffect, useRef } from 'react';

var useUpdate = function useUpdate(effect, deps) {
  var valueRef = useRef(Symbol());
  useEffect(function () {
    if (typeof valueRef.current === 'symbol') {
      // 初始化，跳过
      valueRef.current = deps;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdate;