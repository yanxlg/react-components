"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _Config = require("../Config");

var _utils = require("../utils");

var _api = require("../api");

var _useLoadingState = _interopRequireDefault(require("./useLoadingState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/**
 * 通用列表业务hook
 * @param queryList
 * @param formRef
 * @param extraQuery
 * @param defaultState
 * @param autoQuery
 * @param pageNumberKey
 * @param pageSizeKey
 */
function useList(_a) {
  var queryList = _a.queryList,
      formRef = _a.formRef,
      extraQuery = _a.extraQuery,
      defaultState = _a.defaultState,
      _b = _a.autoQuery,
      autoQuery = _b === void 0 ? true : _b,
      _c = _a.pageNumberKey,
      pageNumberKey = _c === void 0 ? _Config.config.defaultPageNumberKey : _c,
      _d = _a.pageSizeKey,
      pageSizeKey = _d === void 0 ? _Config.config.defaultPageSizeKey : _d;

  var _e, _f;

  var _g = (0, _useLoadingState["default"])(),
      loading = _g[0],
      setLoading = _g[1];

  var extraQueryRef = (0, _react.useRef)(undefined);
  extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

  var pageNumber = (0, _react.useRef)((_e = defaultState === null || defaultState === void 0 ? void 0 : defaultState.pageNumber) !== null && _e !== void 0 ? _e : _Config.config.defaultPageNumber);
  var pageSize = (0, _react.useRef)((_f = defaultState === null || defaultState === void 0 ? void 0 : defaultState.pageSize) !== null && _f !== void 0 ? _f : _Config.config.defaultPageSize);

  var _h = (0, _react.useState)([]),
      dataSource = _h[0],
      setDataSource = _h[1];

  var _j = (0, _react.useState)(0),
      total = _j[0],
      setTotal = _j[1];

  var _k = (0, _react.useState)(undefined),
      extraData = _k[0],
      setExtraData = _k[1];

  var _l = (0, _react.useState)(_utils.EmptyArray),
      selectedRowKeys = _l[0],
      setSelectedRowKeys = _l[1];

  var req = (0, _react.useRef)();
  var query = (0, _react.useRef)({});
  var setQuery = (0, _react.useCallback)(function (nextQuery) {
    query.current = nextQuery;
  }, []);
  var getListData = (0, _react.useCallback)(function (_a) {
    if (_a === void 0) {
      _a = {};
    }

    var _b = _a.page,
        page = _b === void 0 ? pageNumber.current : _b,
        _c = _a.page_count,
        page_count = _c === void 0 ? pageSize.current : _c,
        extra = __rest(_a, ["page", "page_count"]); // 这边终止请求？？


    if (req.current) {
      req.current.cancel();
      req.current = undefined;
    }

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

      var query = __assign(__assign((_a = {}, _a[pageNumberKey] = page, _a[pageSizeKey] = page_count, _a), extra), formValues);

      setSelectedRowKeys(_utils.EmptyArray);
      req.current = typeof queryList === 'object' ? (0, _api.generateApi)(queryList) : queryList(query);
      var request = typeof queryList === 'object' ? req.current.request(query) : req.current.request();
      return request.then(function (_a) {
        var _b = _a.data,
            _c = _b === void 0 ? _utils.EmptyObject : _b,
            _d = _c.total,
            total = _d === void 0 ? 0 : _d,
            _e = _c.list,
            list = _e === void 0 ? [] : _e,
            extraData = __rest(_c, ["total", "list"]);

        setQuery(query);
        pageNumber.current = page;
        pageSize.current = page_count;
        setDataSource(list);
        setTotal(total);
        setExtraData(extraData);
      })["finally"](function () {
        setLoading(false);
      });
    });
  }, []);
  var onReload = (0, _react.useCallback)(function () {
    return getListData(__assign({}, extraQueryRef.current));
  }, []);
  var onSearch = (0, _react.useCallback)(function () {
    var _a;

    return getListData(__assign({
      page: 1,
      page_count: (_a = defaultState === null || defaultState === void 0 ? void 0 : defaultState.pageSize) !== null && _a !== void 0 ? _a : _Config.config.defaultPageSize
    }, extraQueryRef.current));
  }, []);
  var onChange = (0, _react.useCallback)(function (_a, filters, sorter) {
    var current = _a.current,
        pageSize = _a.pageSize;
    var sorterConfig = sorter && sorter.field ? {
      sort_by: sorter.field,
      sort_order: sorter.order
    } : {};
    return getListData(__assign(__assign({
      page: current,
      page_count: pageSize
    }, sorterConfig), extraQueryRef.current));
  }, []);
  (0, _react.useEffect)(function () {
    autoQuery && onSearch();
    return function () {
      if (req.current) {
        req.current.cancel();
        req.current = undefined;
      }
    };
  }, []);
  var setPageSize = (0, _react.useCallback)(function (size) {
    pageSize.current = size;
  }, []);
  var setPageNumber = (0, _react.useCallback)(function (current) {
    pageNumber.current = current;
  }, []);
  return {
    queryRef: query,
    pageNumberRef: pageNumber,
    pageSizeRef: pageSize,

    /**
     * @deprecated
     **/
    query: query.current,
    pageNumber: pageNumber.current,
    pageSize: pageSize.current,
    loading: loading,
    dataSource: dataSource,
    extraData: extraData,
    total: total,
    setLoading: setLoading,
    setDataSource: setDataSource,
    selectedRowKeys: selectedRowKeys,
    setTotal: setTotal,
    onReload: onReload,
    onSearch: onSearch,
    onChange: onChange,
    getListData: getListData,
    setSelectedRowKeys: setSelectedRowKeys,
    setPageSize: setPageSize,
    setPageNumber: setPageNumber
  };
}

var _default = useList;
exports["default"] = _default;