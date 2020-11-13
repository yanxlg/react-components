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

import React, { useCallback, useMemo } from 'react';
import { matchPath } from 'react-router';
import styles from './_index.less';

var LivePages = function LivePages(_a) {
  var routers = _a.routers,
      location = _a.location,
      history = _a.history,
      props = __rest(_a, ["routers", "location", "history"]);

  var routerList = useMemo(function () {
    return [];
  }, []); // cache

  var getRouterList = useCallback(function () {
    var activeIndex = undefined;
    routers.forEach(function (router, index) {
      var match = matchPath(location.pathname, router);

      var route = routerList[index] || __assign({}, router);

      if (match && match.isExact) {
        route.match = match;

        if (activeIndex === void 0) {
          activeIndex = index;
        }
      }

      route.location = location;
      route.history = history;
      routerList[index] = __assign(__assign(__assign({}, props), route), {
        mounted: route.mounted || activeIndex === index
      });
    });
    return {
      routerList: routerList,
      activeIndex: activeIndex
    };
  }, [location.pathname]);
  return useMemo(function () {
    var _a = getRouterList(),
        activeIndex = _a.activeIndex,
        routerList = _a.routerList;

    return /*#__PURE__*/React.createElement(React.Fragment, null, routerList.map(function (_a, index) {
      var Component = _a.component,
          live = _a.live,
          mounted = _a.mounted,
          path = _a.path,
          props = __rest(_a, ["component", "live", "mounted", "path"]);

      var show = activeIndex === index;
      var render = live && mounted || show;
      return render ? /*#__PURE__*/React.createElement("div", {
        key: path,
        className: show ? styles.pageShow : styles.hide
      }, /*#__PURE__*/React.createElement(Component, __assign({}, props))) : null;
    }));
  }, [location.pathname]);
};

export default LivePages;