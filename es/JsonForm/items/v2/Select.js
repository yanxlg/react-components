import "antd/es/select/style/css";
import _Select from "antd/es/select";
import "antd/es/tree-select/style/css";
import _TreeSelect from "antd/es/tree-select";
import "antd/es/form/style/css";
import _Form from "antd/es/form";

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

import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useUpdate from '../../../hooks/useUpdate';
import baseRequest from '../../../request';
import formStyles from '../../_form.less';
import { iterator } from '../../..';
var typeList = ['select@2'];
export function getValueByNamePath(target, namePath) {
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
export function parseOptionList(options, optionKeys, relationKey) {
  if (relationKey) {
    return options.map(function (item) {
      var _a;

      return __assign(__assign({}, item), (_a = {
        label: item[optionKeys[0]],
        value: item[optionKeys[1]]
      }, _a[relationKey] = parseOptionList(item[relationKey] || [], optionKeys, relationKey), _a));
    });
  } else {
    return options.map(function (item) {
      return __assign(__assign({}, item), {
        label: item[optionKeys[0]],
        value: item[optionKeys[1]]
      });
    });
  }
}

var FormSelect = function FormSelect(props) {
  var _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
      relation = props.relation,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      options = props.options,
      childrenProps = props.childrenProps,
      _b = props.defaultOption,
      defaultOption = _b === void 0 ? true : _b,
      defaultCheckedType = props.defaultCheckedType,
      _c = props.optionKeys,
      optionKeys = _c === void 0 ? ['label', 'value'] : _c,
      labelCol = props.labelCol,
      formatter = props.formatter,
      formItemProps = __rest(props, ["className", "relation", "onChange", "labelClassName", "form", "options", "childrenProps", "defaultOption", "defaultCheckedType", "optionKeys", "labelCol", "formatter"]);

  var withSelector = !!options['selector'];
  var withRequest = !!options['url'];
  var withList = Array.isArray(options);

  var _d = useState(withList ? parseOptionList(options, optionKeys, relation === null || relation === void 0 ? void 0 : relation.key) : undefined),
      mergeOptions = _d[0],
      setMergeOptions = _d[1];

  useUpdate(function () {
    if (Array.isArray(options)) {
      setMergeOptions(options);
    }
  }, [options]);
  var reduxOptions = useSelector(withSelector ? function (state) {
    var primaryValue = options['selector'](state);
    return primaryValue ? parseOptionList(primaryValue, optionKeys, relation === null || relation === void 0 ? void 0 : relation.key) : undefined;
  } : function () {
    return undefined;
  }, options['equalityFn']);
  useEffect(function () {
    if (withRequest) {
      var _a = options,
          url = _a.url,
          _b = _a.request,
          request = _b === void 0 ? baseRequest : _b,
          _c = _a.dataPath,
          dataPath_1 = _c === void 0 ? 'data' : _c,
          _d = _a.parser,
          parser_1 = _d === void 0 ? 'array' : _d;
      request.get(url).then(function (result) {
        var values = getValueByNamePath(result, dataPath_1);
        var parseOptions = parser_1 === 'array' ? parseOptionList(values, optionKeys, relation === null || relation === void 0 ? void 0 : relation.key) : iterator(values, function (key, value) {
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
  var getOptionList = useCallback(function () {
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
            var value = item.value;
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
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, [_onChange]);
  var getTreeData = useCallback(function (optionList) {
    if (defaultOption) {
      var isBoolean = typeof defaultOption === 'boolean';
      var parentName = isBoolean ? '全部' : defaultOption['label'];
      var parentValue = isBoolean ? '' : defaultOption['value'] || '';
      return [{
        label: parentName,
        value: parentValue,
        children: optionList
      }];
    } else {
      return optionList;
    }
  }, []);
  var getSelectData = useCallback(function (optionList) {
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
  var g_normalise = useCallback(function (list) {
    return function (value, prevValue, prevValues) {
      var defaultValue = defaultOption === true ? '' : defaultOption ? defaultOption.value : undefined;

      if (value === defaultValue || Array.isArray(value) && value.indexOf(defaultValue) > -1) {
        return list.map(function (_a) {
          var value = _a.value;
          return value;
        });
      } else {
        return value;
      }
    };
  }, []);
  var formItem = useCallback(function () {
    var _a = getOptionList(),
        loading = _a.loading,
        list = _a.options;

    var multiple = childrenProps && (childrenProps.mode === 'tags' || childrenProps.mode === 'multiple');
    var data = multiple ? getTreeData(list) : getSelectData(list);
    return React.createElement(_Form.Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      }),
      normalize: defaultCheckedType === 'checkedAll' ? g_normalise(list) : undefined
    }, formItemProps), multiple ? React.createElement(_TreeSelect, __assign({
      treeNodeLabelProp: "label",
      treeCheckable: true,
      treeDefaultExpandAll: true,
      showArrow: true,
      showCheckedStrategy: 'SHOW_PARENT',
      treeNodeFilterProp: 'title',
      dropdownClassName: formStyles.customTreeSelect,
      className: formStyles.formItemDefault,
      choiceTransitionName: ''
    }, childrenProps, eventProps, {
      loading: loading,
      treeData: data
    })) : React.createElement(_Select, __assign({
      className: formStyles.formItemDefault
    }, childrenProps, {
      options: data,
      loading: loading
    }, eventProps)));
  }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);
  return useMemo(function () {
    if (relation === void 0) {
      return formItem();
    } else {
      return React.createElement(_Form.Item, {
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
  }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);
};

FormSelect.typeList = typeList;
export default FormSelect;