"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _utils = require("../utils");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

function useWaterFall(_a) {
  var queryPromise = _a.queryPromise,
      formRef = _a.formRef,
      extraQuery = _a.extraQuery,
      _b = _a.autoQuery,
      autoQuery = _b === void 0 ? true : _b,
      _c = _a.dependenceKey,
      dependenceKey = _c === void 0 ? 'id' : _c;

  var _d = (0, _react.useState)(autoQuery),
      loading = _d[0],
      setLoading = _d[1];

  var extraQueryRef = (0, _react.useRef)(undefined);
  extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

  var _e = (0, _react.useState)([]),
      dataSource = _e[0],
      setDataSource = _e[1];

  var _f = (0, _react.useState)(0),
      total = _f[0],
      setTotal = _f[1];

  var query = (0, _react.useRef)({});
  var dataSourceRef = (0, _react.useRef)(dataSource);
  dataSourceRef.current = dataSource; // 直接读取

  var setQuery = (0, _react.useCallback)(function (nextQuery) {
    query.current = nextQuery;
  }, []);
  var getListData = (0, _react.useCallback)(function (_a) {
    if (_a === void 0) {
      _a = {};
    }

    var id = _a.id,
        extra = __rest(_a, ["id"]);

    return Promise.resolve().then(function () {
      if (formRef) {
        if (Array.isArray(formRef)) {
          return Promise.all(formRef.map(function (form) {
            return form.current.validateFields();
          })).then(function (valueArray) {
            return Object.assign.apply(Object, __spreadArrays([{}], valueArray));
          });
        } else {
          return formRef.current.validateFields();
        }
      } else {
        return undefined;
      }
    }).then(function (formValues) {
      var _a;

      setLoading(true);

      var query = __assign(__assign({}, extra), formValues);

      return queryPromise(__assign(__assign({}, query), (_a = {}, _a[dependenceKey] = id, _a))).then(function (_a) {
        var _b = _a.data,
            _c = _b === void 0 ? _utils.EmptyObject : _b,
            _d = _c.total,
            total = _d === void 0 ? 0 : _d,
            _e = _c.list,
            list = _e === void 0 ? [] : _e;

        setQuery(query);
        setTotal(total);
        setDataSource([].concat(dataSourceRef.current).concat(list));
      })["finally"](function () {
        setLoading(false);
      });
    });
  }, []);
  var onSearch = (0, _react.useCallback)(function () {
    return getListData(__assign({}, extraQueryRef.current));
  }, []);
  var onNext = (0, _react.useCallback)(function () {
    var item = dataSourceRef.current[dataSourceRef.current.length - 1];
    var id = item === null || item === void 0 ? void 0 : item[dependenceKey];
    return getListData(__assign({
      id: id
    }, extraQueryRef.current));
  }, []);
  (0, _react.useEffect)(function () {
    autoQuery && onSearch();
  }, []);
  return {
    queryRef: query,
    loading: loading,
    dataSource: dataSource,
    total: total,
    setLoading: setLoading,
    setDataSource: setDataSource,
    setTotal: setTotal,
    onNext: onNext,
    onSearch: onSearch,
    getListData: getListData
  };
}

var _default = useWaterFall;
exports["default"] = _default;