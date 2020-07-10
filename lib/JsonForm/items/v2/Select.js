"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/select/style/css");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/tree-select/style/css");

var _treeSelect = _interopRequireDefault(require("antd/es/tree-select"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _useUpdate = _interopRequireDefault(require("../../../hooks/useUpdate"));

var _request = _interopRequireDefault(require("../../../request"));

var _form2 = _interopRequireDefault(require("../../_form.less"));

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

var typeList = ['select@2'];

function getValueByNamePath(target, namePath) {
  if (Array.isArray(namePath)) {
    var name_1 = namePath.shift();

    if (namePath.length === 0) {
      return target[name_1];
    } else {
      return getValueByNamePath(target[name_1], namePath);
    }
  } else {
    return target[namePath];
  }
}

var FormSelect = function FormSelect(props) {
  var label = props.label,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].formItem : _a,
      relation = props.relation,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      options = props.options,
      itemProps = props.itemProps,
      _b = props.defaultOption,
      defaultOption = _b === void 0 ? true : _b,
      _c = props.optionKeys,
      optionKeys = _c === void 0 ? ['label', 'value'] : _c,
      labelCol = props.labelCol,
      formItemProps = __rest(props, ["label", "className", "relation", "onChange", "labelClassName", "form", "options", "itemProps", "defaultOption", "optionKeys", "labelCol"]);

  var withSelector = !options['selector'];
  var withRequest = !!options['url'];
  var withList = Array.isArray(options);

  var _d = (0, _react.useState)(withList ? options : undefined),
      mergeOptions = _d[0],
      setMergeOptions = _d[1];

  (0, _useUpdate["default"])(function () {
    if (Array.isArray(options)) {
      setMergeOptions(options);
    }
  }, [options]);
  var reduxOptions = (0, _reactRedux.useSelector)(withSelector ? options['selector'] : function () {
    return undefined;
  }, options['equalityFn']);
  (0, _react.useEffect)(function () {
    if (withRequest) {
      var _a = options,
          url = _a.url,
          _b = _a.request,
          request = _b === void 0 ? _request["default"] : _b,
          _c = _a.dataPath,
          dataPath_1 = _c === void 0 ? 'data' : _c;
      request.get(url).then(function (result) {
        setMergeOptions(getValueByNamePath(result, dataPath_1));
      })["catch"](function () {
        setMergeOptions([]);
      });
    }
  }, []);
  var getOptionList = (0, _react.useCallback)(function () {
    if (withRequest || withSelector) {
      var mOptions = withRequest ? mergeOptions : reduxOptions;

      if (relation) {
        var namePath = relation.name,
            _a = relation.key,
            dependenceKey_1 = _a === void 0 ? 'children' : _a;
        var dependenceNameList = Array.isArray(namePath) ? namePath : [namePath];
        var parentItem = mOptions;

        var _loop_1 = function _loop_1(dependenceName) {
          // 兼容多选
          var dependenceValue = form === null || form === void 0 ? void 0 : form.getFieldValue(dependenceName);
          dependenceValue = Array.isArray(dependenceValue) ? dependenceValue : [dependenceValue];
          var siblings = parentItem === null || parentItem === void 0 ? void 0 : parentItem.filter(function (item) {
            var value = item[optionKeys[1]];
            return dependenceValue.indexOf(value) > -1;
          });

          if (siblings) {
            var list_1 = [];
            siblings.forEach(function (item) {
              list_1.push.apply(list_1, item[dependenceKey_1] || []);
            });
            parentItem = list_1;
          } else {
            parentItem = [];
          }
        };

        for (var _i = 0, dependenceNameList_1 = dependenceNameList; _i < dependenceNameList_1.length; _i++) {
          var dependenceName = dependenceNameList_1[_i];

          _loop_1(dependenceName);
        }

        var loading = !options;
        var mergeList = parentItem || [];
        return {
          loading: loading,
          options: mergeList
        };
      } else {
        var loading = withRequest && !mOptions;
        var mergeList = mOptions || [];
        return {
          loading: loading,
          options: mergeList
        };
      }
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
  }, [mergeOptions, reduxOptions]);
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, [_onChange]);
  var getTreeData = (0, _react.useCallback)(function (optionList) {
    if (defaultOption) {
      var isBoolean = typeof defaultOption === 'boolean';
      var parentName = isBoolean ? '全部' : defaultOption['label'];
      var parentValue = isBoolean ? '' : defaultOption['value'] || '';
      return [{
        label: parentName,
        value: parentValue,
        children: optionList.map(function (item) {
          return __assign(__assign({}, item), {
            name: item[optionKeys[0]],
            value: item[optionKeys[1]]
          });
        })
      }];
    } else {
      return optionList.map(function (item) {
        return __assign(__assign({}, item), {
          label: item[optionKeys[0]],
          value: item[optionKeys[1]]
        });
      });
    }
  }, []);
  var getSelectData = (0, _react.useCallback)(function (optionList) {
    if (defaultOption) {
      var isBoolean = typeof defaultOption === 'boolean';
      var parentName = isBoolean ? '全部' : defaultOption['label'];
      var parentValue = isBoolean ? '' : defaultOption['value'] || '';
      return __spreadArrays([{
        label: parentName,
        value: parentValue
      }], optionList);
    } else {
      return optionList;
    }
  }, []);
  var formItem = (0, _react.useCallback)(function () {
    var _a = getOptionList(),
        loading = _a.loading,
        list = _a.options;

    var multiple = itemProps && (itemProps.mode === 'tags' || itemProps.mode === 'multiple');
    var data = multiple ? getTreeData(list) : getSelectData(list);
    return _react["default"].createElement(_form["default"].Item, __assign({
      name: name,
      className: className,
      label: label,
      labelCol: __assign(__assign({}, labelCol), {
        className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), multiple ? _react["default"].createElement(_treeSelect["default"], __assign({
      treeNodeLabelProp: "label",
      className: className,
      treeCheckable: true,
      treeDefaultExpandAll: true,
      showArrow: true,
      showCheckedStrategy: 'SHOW_PARENT',
      treeNodeFilterProp: 'title'
    }, itemProps, eventProps, {
      loading: loading,
      treeData: data
    })) : _react["default"].createElement(_select["default"], __assign({}, itemProps, {
      options: data,
      loading: loading
    }, eventProps)));
  }, [mergeOptions, reduxOptions]);
  return (0, _react.useMemo)(function () {
    if (relation === void 0) {
      return formItem();
    } else {
      return _react["default"].createElement(_form["default"].Item, {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, currentValues) {
          var namePath = relation.name;
          var dependenceNameList = Array.isArray(namePath) ? namePath : [namePath];
          var updated = false;
          var i = 0;
          var length = dependenceNameList.length;

          while (!updated && i < length) {
            var dependenceName = dependenceNameList[i];
            updated = prevValues[dependenceName] !== currentValues[dependenceName];
            i++;
          }

          return updated;
        }
      }, function (_a) {
        var getFieldValue = _a.getFieldValue;
        return formItem();
      });
    }
  }, [mergeOptions, reduxOptions]);
};

FormSelect.typeList = typeList;
var _default = FormSelect;
exports["default"] = _default;