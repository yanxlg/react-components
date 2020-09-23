"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _index = _interopRequireDefault(require("./_index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var LivePages = function LivePages(_a) {
  var routers = _a.routers,
      location = _a.location,
      history = _a.history,
      props = __rest(_a, ["routers", "location", "history"]);

  var routerList = (0, _react.useMemo)(function () {
    return [];
  }, []); // cache

  var getRouterList = (0, _react.useCallback)(function () {
    var activeIndex = undefined;
    routers.forEach(function (router, index) {
      var match = (0, _reactRouter.matchPath)(location.pathname, router);

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
  return (0, _react.useMemo)(function () {
    var _a = getRouterList(),
        activeIndex = _a.activeIndex,
        routerList = _a.routerList;

    return _react["default"].createElement(_react["default"].Fragment, null, routerList.map(function (_a, index) {
      var Component = _a.component,
          live = _a.live,
          mounted = _a.mounted,
          path = _a.path,
          props = __rest(_a, ["component", "live", "mounted", "path"]);

      var show = activeIndex === index;
      var render = live && mounted || show;
      return render ? _react["default"].createElement("div", {
        key: path,
        className: show ? _index["default"].pageShow : _index["default"].hide
      }, _react["default"].createElement(Component, __assign({}, props))) : null;
    }));
  }, [location.pathname]);
};

var _default = LivePages;
exports["default"] = _default;