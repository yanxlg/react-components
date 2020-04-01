import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { ConfigConsumer } from "antd/es/config-provider/context";
import { Alert } from 'antd';
import './index.less';

var defaultAlertOptionRender = function defaultAlertOptionRender(props) {
  var onCleanSelected = props.onCleanSelected;
  return [React.createElement("a", {
    onClick: onCleanSelected,
    key: "0"
  }, "\u6E05\u7A7A")];
};

var TableAlert = function TableAlert(_a, ref) {
  var _b = _a.selectedRowKeys,
      selectedRowKeys = _b === void 0 ? [] : _b,
      onCleanSelected = _a.onCleanSelected,
      _c = _a.alertInfoRender,
      alertInfoRender = _c === void 0 ? function () {
    return React.createElement("span", null, "\u5DF2\u9009\u62E9 ", React.createElement("a", {
      style: {
        fontWeight: 600
      }
    }, selectedRowKeys.length), " \u9879\xA0\xA0");
  } : _c,
      _d = _a.alertOptionRender,
      alertOptionRender = _d === void 0 ? defaultAlertOptionRender : _d;

  var _e = useState([]),
      innerSelectedRowKeys = _e[0],
      setInnerSelectedRowKeys = _e[1];

  var _selectedRowKeys = selectedRowKeys !== void 0 ? selectedRowKeys : innerSelectedRowKeys;

  useImperativeHandle(ref, function () {
    return {
      updateSelectedState: function updateSelectedState(selectedRowKeys) {
        setInnerSelectedRowKeys(selectedRowKeys);
      }
    };
  }, []);
  var option = alertOptionRender && alertOptionRender({
    onCleanSelected: onCleanSelected
  });
  return useMemo(function () {
    return React.createElement(ConfigConsumer, null, function (_a) {
      var getPrefixCls = _a.getPrefixCls;
      var className = getPrefixCls('pro-table-alert');

      if (alertInfoRender === false) {
        return null;
      }

      var dom = alertInfoRender(_selectedRowKeys);

      if (dom === false) {
        return null;
      }

      return React.createElement("div", {
        className: className
      }, React.createElement(Alert, {
        message: React.createElement("div", {
          className: className + "-info"
        }, React.createElement("div", {
          className: className + "-info-content"
        }, dom), option && React.createElement("div", {
          className: className + "-info-option"
        }, option)),
        type: "info",
        showIcon: true
      }));
    });
  }, [_selectedRowKeys]);
};

export default forwardRef(TableAlert);