import { useCallback, useEffect, useRef, useState } from 'react';
import { generateApi } from '../api';
import useLoadingState from './useLoadingState';

function useLoading(_a) {
  var apiService = _a.apiService,
      initData = _a.initData;

  var _b = useLoadingState(false),
      loading = _b[0],
      setLoading = _b[1];

  var _c = useState(initData),
      data = _c[0],
      setData = _c[1];

  var api = useRef(typeof apiService === 'object' ? generateApi(apiService) : apiService());
  var service = useCallback(function (data) {
    api.current.cancel();
    setLoading(true);
    return api.current.request(data).then(function (result) {
      setData(result === null || result === void 0 ? void 0 : result.data);
      return result;
    })["finally"](function () {
      setLoading(false);
    });
  }, []);
  useEffect(function () {
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

export default useLoading;