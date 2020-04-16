"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateApi = exports["default"] = void 0;

var _umiRequest = _interopRequireDefault(require("umi-request"));

var _request2 = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
/**
 * 通过配置生成api service，供简单使用
 */


var CancelToken = _umiRequest["default"].CancelToken;

var noloop = function noloop(value) {
  return value;
};

var generateApi = function generateApi(_a) {
  var _b = _a.method,
      method = _b === void 0 ? 'get' : _b,
      path = _a.path,
      options = _a.options;

  var _c = CancelToken.source(),
      token = _c.token,
      _cancel = _c.cancel; // umi-request abort


  var _onfulfilled;

  var service = {
    request: function request(data) {
      var _a;

      var _options;

      var key = method.toLowerCase() === 'get' ? 'params' : 'data';

      if ((options === null || options === void 0 ? void 0 : options[key]) || data) {
        _options = (_a = {}, _a[key] = __assign(__assign({}, options === null || options === void 0 ? void 0 : options[key]), data), _a);
      }

      if (_onfulfilled) {
        return _request2["default"][method](path, _extends({}, options, _options, {
          cancelToken: token
        })).then(_onfulfilled);
      } else {
        return _request2["default"][method](path, _extends({}, options, _options, {
          cancelToken: token
        }));
      }
    },
    cancel: function cancel() {
      _cancel('by code');
    },
    then: function then(onfulfilled) {
      _onfulfilled = onfulfilled || noloop;
      return service;
    }
  };
  return service;
};

exports.generateApi = generateApi;
var api = {
  get: function get(path, options) {
    return generateApi({
      method: 'get',
      path: path,
      options: options
    });
  },
  post: function post(path, options) {
    return generateApi({
      method: 'post',
      path: path,
      options: options
    });
  },
  "delete": function _delete(path, options) {
    return generateApi({
      method: 'delete',
      path: path,
      options: options
    });
  },
  put: function put(path, options) {
    return generateApi({
      method: 'put',
      path: path,
      options: options
    });
  },
  patch: function patch(path, options) {
    return generateApi({
      method: 'patch',
      path: path,
      options: options
    });
  },
  head: function head(path, options) {
    return generateApi({
      method: 'head',
      path: path,
      options: options
    });
  },
  options: function options(path, _options2) {
    return generateApi({
      method: 'options',
      path: path,
      options: _options2
    });
  },
  rpc: function rpc(path, options) {
    return generateApi({
      method: 'rpc',
      path: path,
      options: options
    });
  }
};
var _default = api;
exports["default"] = _default;