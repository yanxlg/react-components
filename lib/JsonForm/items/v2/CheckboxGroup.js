"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/spin/style/css");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _form2 = _interopRequireDefault(require("../../_form.less"));

var _Select = require("./Select");

var _classnames = _interopRequireDefault(require("classnames"));

var _useUpdate = _interopRequireDefault(require("../../../hooks/useUpdate"));

var _reactRedux = require("react-redux");

var _request = _interopRequireDefault(require("../../../request"));

var _ = require("../../..");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var typeList = ['checkboxGroup@2'];

var FormCheckboxGroup = function FormCheckboxGroup(props) {
  var labelClassName = props.labelClassName,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].formItem : _a,
      _onChange = props.onChange,
      form = props.form,
      childrenProps = props.childrenProps,
      type = props.type,
      options = props.options,
      optionKeys = props.optionKeys,
      _b = props.showLoading,
      showLoading = _b === void 0 ? true : _b,
      labelCol = props.labelCol,
      formItemProps = __rest(props, ["labelClassName", "className", "onChange", "form", "childrenProps", "type", "options", "optionKeys", "showLoading", "labelCol"]);

  var withSelector = !!options['selector'];
  var withRequest = !!options['url'];
  var withList = Array.isArray(options);

  var _c = (0, _react.useState)(withList ? (0, _Select.parseOptionList)(options, optionKeys) : undefined),
      mergeOptions = _c[0],
      setMergeOptions = _c[1];

  (0, _useUpdate["default"])(function () {
    if (Array.isArray(options)) {
      setMergeOptions(options);
    }
  }, [options]);
  var reduxOptions = (0, _reactRedux.useSelector)(withSelector ? function (state) {
    var primaryValue = options['selector'](state);
    return primaryValue ? (0, _Select.parseOptionList)(primaryValue, optionKeys) : undefined;
  } : function () {
    return undefined;
  }, options['equalityFn']);
  (0, _react.useEffect)(function () {
    if (withRequest) {
      var _a = options,
          url = _a.url,
          _b = _a.request,
          request = _b === void 0 ? _request["default"] : _b,
          _c = _a.dataPath,
          dataPath_1 = _c === void 0 ? 'data' : _c,
          _d = _a.parser,
          parser_1 = _d === void 0 ? 'array' : _d;
      request.get(url).then(function (result) {
        var values = (0, _Select.getValueByNamePath)(result, dataPath_1);
        var parseOptions = parser_1 === 'array' ? (0, _Select.parseOptionList)(values, optionKeys) : (0, _.iterator)(values, function (key, value) {
          return {
            label: value,
            value: key
          };
        });
        setMergeOptions(parseOptions);
      })["catch"](function () {
        setMergeOptions([]);
      });
    }
  }, []);
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  var getOptionList = (0, _react.useCallback)(function () {
    if (withRequest || withSelector) {
      var mOptions = withRequest ? mergeOptions : reduxOptions;
      var loading = withRequest && !mOptions;
      var mergeList = mOptions || [];
      return {
        loading: loading,
        options: mergeList
      };
    }

    if (withList) {
      return {
        loading: false,
        options: mergeOptions
      };
    }

    return {
      loading: false,
      options: []
    };
  }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);
  return (0, _react.useMemo)(function () {
    var _a = getOptionList(),
        loading = _a.loading,
        options = _a.options;

    return _react["default"].createElement(_form["default"].Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), loading && showLoading ? _react["default"].createElement(_spin["default"], {
      spinning: true
    }) : _react["default"].createElement(_checkbox["default"].Group, __assign({}, childrenProps, {
      options: options
    }, eventProps)));
  }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);
};

FormCheckboxGroup.typeList = typeList;
var _default = FormCheckboxGroup;
exports["default"] = _default;