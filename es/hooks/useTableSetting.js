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

import { useLocalStorageState } from '@umijs/hooks';
import { useCallback, useMemo } from 'react';

var compareVersion = function compareVersion(setting, version) {
  if (version === void 0) {
    version = '';
  }

  var lastVersion = setting === null || setting === void 0 ? void 0 : setting.version;
  return !lastVersion || lastVersion === version;
};

var useTableSetting = function useTableSetting(settingKey, version) {
  if (version === void 0) {
    version = '1.0';
  }

  var _a = useLocalStorageState('_table_config', undefined),
      allSetting = _a[0],
      setAllSetting = _a[1];

  var setting = useMemo(function () {
    return allSetting === null || allSetting === void 0 ? void 0 : allSetting[settingKey];
  }, [allSetting]);
  var updateHideKeys = useCallback(function (hideKeys) {
    setAllSetting(function (allSetting) {
      var _a;

      var setting = allSetting === null || allSetting === void 0 ? void 0 : allSetting[settingKey];
      var compareV = compareVersion(setting, version);
      return __assign(__assign({}, allSetting), (_a = {}, _a[settingKey] = {
        sortKeys: compareV ? setting === null || setting === void 0 ? void 0 : setting.sortKeys : undefined,
        hideKeys: hideKeys,
        version: version
      }, _a));
    });
  }, []);
  var updateSortKeys = useCallback(function (sortKeys) {
    setAllSetting(function (allSetting) {
      var _a;

      var setting = allSetting === null || allSetting === void 0 ? void 0 : allSetting[settingKey];
      var compareV = compareVersion(setting, version);
      return __assign(__assign({}, allSetting), (_a = {}, _a[settingKey] = {
        hideKeys: compareV ? setting === null || setting === void 0 ? void 0 : setting.hideKeys : undefined,
        sortKeys: sortKeys,
        version: version
      }, _a));
    });
  }, []);
  var compareV = compareVersion(setting, version);
  return useMemo(function () {
    return {
      settingKey: settingKey,
      hideKeys: compareV ? setting === null || setting === void 0 ? void 0 : setting.hideKeys : undefined,
      sortKeys: compareV ? setting === null || setting === void 0 ? void 0 : setting.sortKeys : undefined,
      updateHideKeys: updateHideKeys,
      updateSortKeys: updateSortKeys
    };
  }, [allSetting]);
};

export default useTableSetting;