"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function useDataSet() {
  var _a = (0, _react.useState)([]),
      dataSet = _a[0],
      setDataSet = _a[1];

  var _b = (0, _react.useState)(false),
      loading = _b[0],
      setLoading = _b[1];

  return {
    dataSet: dataSet,
    setDataSet: setDataSet,
    loading: loading,
    setLoading: setLoading
  };
}

var _default = useDataSet;
exports["default"] = _default;