function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
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
/**
 * request 网络请求工具
 * request 需要支持cancel，并提供hooks 实现unmount 自动cancel；默认使用request，支持传入自定义request
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */


import { default as Request, extend } from 'umi-request';
import message from './message';
import { clearEmptyVal } from './utils';
import AbortController from 'abort-controller'; // 添加默认行为

var codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求地址不存在。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

var requestId = function requestId() {
  return Date.now() + '' + Math.ceil(Math.random() * 100000);
};

var successReg = /^200|success$/;

function addDefaultInterceptors(req) {
  var _this = this;

  req.interceptors.response.use(function (response, options) {
    return __awaiter(_this, void 0, void 0, function () {
      var skipResponseInterceptors, status, msg, responseType, data, state, msg, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            skipResponseInterceptors = options === null || options === void 0 ? void 0 : options.skipResponseInterceptors;

            if (!response) {
              !skipResponseInterceptors && message.error('服务异常，无结果返回！');
              throw response;
            }

            status = response.status;

            if (status < 200 || status >= 300) {
              msg = codeMessage[status];
              !skipResponseInterceptors && msg && message.error(status + "\uFF1A" + msg);
              throw {
                type: 'HttpError',
                data: response.body,
                message: msg
              };
            }

            responseType = options.responseType;
            if (!(responseType === void 0 || responseType === 'json')) return [3
            /*break*/
            , 4];
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , response.clone().json()];

          case 2:
            data = _a.sent();
            state = data.code || data.status || data.state;
            msg = data.msg || (typeof data.data === 'string' ? data.data : '') || data.message || data.error;

            if (!successReg.test(String(state))) {
              !skipResponseInterceptors && message.error(msg);
              skipResponseInterceptors = true;
              throw {
                type: 'HttpError',
                data: data,
                message: msg,
                response: response
              };
            }

            return [2
            /*return*/
            , response];

          case 3:
            error_1 = _a.sent(); // 结果存在问题，类似no response 进行处理

            !skipResponseInterceptors && message.error('服务异常，返回结果无法解析！');
            throw {
              type: 'HttpError',
              data: response.body,
              response: response,
              message: error_1.message
            };

          case 4:
            return [2
            /*return*/
            , response];
        }
      });
    });
  }, {
    global: false
  });
  req.interceptors.request.use(function (url, options) {
    options.headers = _extends({}, options.headers, {
      request_id: requestId()
    });

    var params = options.params,
        data = options.data,
        extra = __rest(options, ["params", "data"]);

    return {
      url: url,
      options: __assign(__assign({}, extra), {
        params: params ? clearEmptyVal(params) : undefined,
        data: data ? clearEmptyVal(data) : undefined
      })
    };
  }, {
    global: false
  }); // 处理abort 逻辑

  req.interceptors.request.use(function (url, options) {
    if (options === null || options === void 0 ? void 0 : options.cancelToken) {
      var controller_1 = new AbortController(); // fetch abort

      var signal = controller_1.signal;
      options.cancelToken.promise.then(function () {
        controller_1.abort();
      });
      return {
        url: url,
        options: __assign(__assign({}, options), {
          signal: signal
        })
      };
    } else {
      return {
        url: url,
        options: options
      };
    }
  }, {
    global: false
  });
}

var request = extend({
  errorHandler: function errorHandler(err) {
    if (request.isCancel(err) || typeof err === 'object' && /abort/.test(err.message)) {
      throw new Request.Cancel(err.message); // abort统一抛出异常，不进行处理
    }

    throw err;
  }
});
addDefaultInterceptors(request);

var replace = function replace(customReq, useDefaultInterceptors) {
  if (useDefaultInterceptors === void 0) {
    useDefaultInterceptors = true;
  }

  request = customReq;
  request.replace = replace;

  if (useDefaultInterceptors) {
    // 重新绑定拦截器
    addDefaultInterceptors(request);
  }
};

request.replace = replace;
export default request;