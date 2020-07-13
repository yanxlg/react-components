import "antd/es/checkbox/style/css";
import _Checkbox from "antd/es/checkbox";
import "antd/es/spin/style/css";
import _Spin from "antd/es/spin";
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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import formStyles from '../../_form.less';
import { getValueByNamePath, parseOptionList } from './Select';
import classNames from 'classnames';
import useUpdate from '../../../hooks/useUpdate';
import { useSelector } from 'react-redux';
import baseRequest from '../../../request';
import { iterator } from '../../../utils/iterator';
var typeList = ['checkboxGroup@2'];

var FormCheckboxGroup = function FormCheckboxGroup(props) {
  var labelClassName = props.labelClassName,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
      _onChange = props.onChange,
      form = props.form,
      childrenProps = props.childrenProps,
      type = props.type,
      options = props.options,
      _b = props.optionKeys,
      optionKeys = _b === void 0 ? ['label', 'value'] : _b,
      _c = props.showLoading,
      showLoading = _c === void 0 ? true : _c,
      labelCol = props.labelCol,
      formItemProps = __rest(props, ["labelClassName", "className", "onChange", "form", "childrenProps", "type", "options", "optionKeys", "showLoading", "labelCol"]);

  var withSelector = !!options['selector'];
  var withRequest = !!options['url'] || !!options['service'];
  var withList = Array.isArray(options);

  var _d = useState(withList ? parseOptionList(options, optionKeys) : undefined),
      mergeOptions = _d[0],
      setMergeOptions = _d[1];

  useUpdate(function () {
    if (Array.isArray(options)) {
      setMergeOptions(options);
    }
  }, [options]);
  var reduxOptions = useSelector(withSelector ? function (state) {
    var primaryValue = options['selector'](state);
    return primaryValue ? parseOptionList(primaryValue, optionKeys) : undefined;
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
          parser_1 = _d === void 0 ? 'array' : _d,
          service = _a.service;
      (service ? service() : request.get(url)).then(function (result) {
        var values = getValueByNamePath(result, dataPath_1);
        var parseOptions = parser_1 === 'array' ? parseOptionList(values, optionKeys) : iterator(values, function (key, value) {
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
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  var getOptionList = useCallback(function () {
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
  return useMemo(function () {
    var _a = getOptionList(),
        loading = _a.loading,
        options = _a.options;

    return React.createElement(_Form.Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), loading && showLoading ? React.createElement(_Spin, {
      spinning: true
    }) : React.createElement(_Checkbox.Group, __assign({}, childrenProps, {
      options: options
    }, eventProps)));
  }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);
};

FormCheckboxGroup.typeList = typeList;
export default FormCheckboxGroup;