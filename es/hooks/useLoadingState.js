import { useCallback, useRef, useState } from 'react';

function useLoadingState(initState) {
  if (initState === void 0) {
    initState = false;
  }

  var _a = useState(initState),
      loadingState = _a[0],
      setLoadingState = _a[1];

  var loadingCount = useRef(initState ? 1 : 0);
  var setLoading = useCallback(function (loading) {
    var count = loadingCount.current;

    if (loading === true) {
      if (count === 0) {
        setLoadingState(true);
      }

      loadingCount.current += 1;
    }

    if (loading === false) {
      if (count === 1) {
        setLoadingState(false);
      }

      if (count > 0) {
        loadingCount.current -= 1;
      }
    }
  }, []);
  return [loadingState, setLoading];
}

export default useLoadingState;