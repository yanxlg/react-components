var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __spreadArrays = this && this.__spreadArrays || function () {
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

import { useRef, useState, useCallback, useEffect } from 'react';
import { config } from '../Config';
import { EmptyArray, EmptyObject } from '../utils';
import { generateApi } from '../api';
import Request from 'umi-request';
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
      pageNumberKey = _c === void 0 ? config.defaultPageNumberKey : _c,
      _d = _a.pageSizeKey,
      pageSizeKey = _d === void 0 ? config.defaultPageSizeKey : _d;

  var _e, _f;

  var _g = useState(autoQuery),
      loading = _g[0],
      setLoading = _g[1];

  var extraQueryRef = useRef(undefined);
  extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

  var pageNumber = useRef((_e = defaultState === null || defaultState === void 0 ? void 0 : defaultState.pageNumber) !== null && _e !== void 0 ? _e : config.defaultPageNumber);
  var pageSize = useRef((_f = defaultState === null || defaultState === void 0 ? void 0 : defaultState.pageSize) !== null && _f !== void 0 ? _f : config.defaultPageSize);

  var _h = useState([]),
      dataSource = _h[0],
      setDataSource = _h[1];

  var _j = useState(0),
      total = _j[0],
      setTotal = _j[1];

  var _k = useState(undefined),
      extraData = _k[0],
      setExtraData = _k[1];

  var _l = useState(EmptyArray),
      selectedRowKeys = _l[0],
      setSelectedRowKeys = _l[1];

  var req = useRef();
  var query = useRef({});
  var setQuery = useCallback(function (nextQuery) {
    query.current = nextQuery;
  }, []);
  var getListData = useCallback(function (_a) {
    // 这边终止请求？？
    if (_a === void 0) {
      _a = {};
    }

    var _b = _a.page,
        page = _b === void 0 ? pageNumber.current : _b,
        _c = _a.page_count,
        page_count = _c === void 0 ? pageSize.current : _c,
        extra = __rest(_a, ["page", "page_count"]);

    if (req.current) {
      req.current.cancel();
      req.current = undefined;
    }

    setLoading(false);
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

      setSelectedRowKeys(EmptyArray);
      req.current = typeof queryList === 'object' ? generateApi(queryList) : queryList(query);
      var request = typeof queryList === 'object' ? req.current.request(query) : req.current.request();
      return request.then(function (_a) {
        var _b = _a.data,
            _c = _b === void 0 ? EmptyObject : _b,
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
      }).then(function (result) {
        setLoading(false);
        return result;
      }, function (err) {
        if (Request.isCancel(err)) {
          throw err;
        } else {
          setLoading(false);
          throw err;
        }
      });
    });
  }, []);
  var onReload = useCallback(function () {
    return getListData(__assign({}, extraQueryRef.current));
  }, []);
  var onSearch = useCallback(function () {
    var _a;

    return getListData(__assign({
      page: 1,
      page_count: (_a = defaultState === null || defaultState === void 0 ? void 0 : defaultState.pageSize) !== null && _a !== void 0 ? _a : config.defaultPageSize
    }, extraQueryRef.current));
  }, []);
  var onChange = useCallback(function (_a, filters, sorter) {
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
  useEffect(function () {
    autoQuery && onSearch();
    return function () {
      if (req.current) {
        req.current.cancel();
        req.current = undefined;
      }
    };
  }, []);
  var setPageSize = useCallback(function (size) {
    pageSize.current = size;
  }, []);
  var setPageNumber = useCallback(function (current) {
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

export default useList;