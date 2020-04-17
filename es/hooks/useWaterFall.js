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
import { EmptyObject } from '../utils';
import { config } from '../Config';
import { generateApi } from '../api';
import useLoadingState from './useLoadingState';
/**
 *
 * @param queryPromise api service
 * @param formRef form表单实例
 * @param extraQuery 额外的api参数
 * @param autoQuery 是否立即执行api
 * @param dependenceKey 瀑布流依赖字段key
 * @param size 瀑布流获取长度
 */

function useWaterFall(_a) {
  var queryPromise = _a.queryPromise,
      formRef = _a.formRef,
      extraQuery = _a.extraQuery,
      _b = _a.autoQuery,
      autoQuery = _b === void 0 ? true : _b,
      _c = _a.dependenceKey,
      dependenceKey = _c === void 0 ? 'id' : _c,
      _d = _a.size,
      size = _d === void 0 ? config.defaultWaterFallSize : _d;

  var _e = useLoadingState(),
      loading = _e[0],
      setLoading = _e[1];

  var extraQueryRef = useRef(undefined);
  extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

  var _f = useState([]),
      dataSource = _f[0],
      setDataSource = _f[1];

  var _g = useState(0),
      total = _g[0],
      setTotal = _g[1];

  var _h = useState([]),
      increment = _h[0],
      setIncrement = _h[1];

  var query = useRef({});
  var dataSourceRef = useRef(dataSource);
  dataSourceRef.current = dataSource; // 直接读取

  var hasMoreRef = useRef(true);
  var setQuery = useCallback(function (nextQuery) {
    query.current = nextQuery;
  }, []);
  var req = useRef();
  var getListData = useCallback(function (_a) {
    if (_a === void 0) {
      _a = {};
    }

    var id = _a.id,
        extra = __rest(_a, ["id"]); // 这边终止请求？？


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
      setLoading(true);

      var query = __assign(__assign({
        size: size,
        id: id
      }, extra), formValues);

      req.current = typeof queryPromise === 'object' ? generateApi(queryPromise) : queryPromise(query);
      var request = typeof queryPromise === 'object' ? req.current.request(query) : req.current.request();
      return request.then(function (_a) {
        var _b = _a.data,
            _c = _b === void 0 ? EmptyObject : _b,
            _d = _c.total,
            total = _d === void 0 ? 0 : _d,
            _e = _c.list,
            list = _e === void 0 ? [] : _e;

        setQuery(query);
        setTotal(total);
        setIncrement(list);
        setDataSource([].concat(dataSourceRef.current).concat(list));
        hasMoreRef.current = list.length >= size;
      })["finally"](function () {
        setLoading(false);
      });
    });
  }, []);
  var onSearch = useCallback(function () {
    hasMoreRef.current = true;
    return getListData(__assign({}, extraQueryRef.current));
  }, []);
  var onNext = useCallback(function () {
    if (hasMoreRef.current) {
      var item = dataSourceRef.current[dataSourceRef.current.length - 1];
      var id = item === null || item === void 0 ? void 0 : item[dependenceKey];
      return getListData(__assign({
        id: id
      }, extraQueryRef.current));
    } else {
      return Promise.resolve();
    }
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
  return {
    queryRef: query,
    hasMoreRef: hasMoreRef,
    loading: loading,
    dataSource: dataSource,
    dataSourceRef: dataSourceRef,
    increment: increment,
    total: total,
    setLoading: setLoading,
    setDataSource: setDataSource,
    setTotal: setTotal,
    onNext: onNext,
    onSearch: onSearch,
    getListData: getListData
  };
}

export default useWaterFall;