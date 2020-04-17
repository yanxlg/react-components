"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function useLoadingState(initState) {
  if (initState === void 0) {
    initState = false;
  }

  var _a = (0, _react.useState)(initState),
      loadingState = _a[0],
      setLoadingState = _a[1];

  var loadingCount = (0, _react.useRef)(initState ? 1 : 0);
  var setLoading = (0, _react.useCallback)(function (loading) {
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

var _default = useLoadingState;
exports["default"] = _default;