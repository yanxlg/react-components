"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _api = require("../api");

var _useLoadingState = _interopRequireDefault(require("./useLoadingState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useLoading(_a) {
  var apiService = _a.apiService,
      initData = _a.initData;

  var _b = (0, _useLoadingState["default"])(),
      loading = _b[0],
      setLoading = _b[1];

  var _c = (0, _react.useState)(initData),
      data = _c[0],
      setData = _c[1];

  var api = (0, _react.useRef)(typeof apiService === 'object' ? (0, _api.generateApi)(apiService) : apiService());
  var service = (0, _react.useCallback)(function (data) {
    api.current.cancel();
    setLoading(true);
    return api.current.request(data).then(function (result) {
      setData(result === null || result === void 0 ? void 0 : result.data);
      return result;
    })["finally"](function () {
      setLoading(false);
    });
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      api.current.cancel();
    };
  }, []);
  return {
    service: service,
    loading: loading,
    data: data,
    setData: setData
  };
}

var _default = useLoading;
exports["default"] = _default;