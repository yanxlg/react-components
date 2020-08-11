import "antd/es/tooltip/style/css";
import _Tooltip from "antd/es/tooltip";
import React, { useEffect, useMemo, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

var FullScreenIcon = function FullScreenIcon() {
  var _a = useState(false),
      fullscreen = _a[0],
      setFullscreen = _a[1];

  useEffect(function () {
    document.onfullscreenchange = function () {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);
  return useMemo(function () {
    return fullscreen ? /*#__PURE__*/React.createElement(_Tooltip, {
      title: '退出全屏'
    }, /*#__PURE__*/React.createElement(FullscreenExitOutlined, null)) : /*#__PURE__*/React.createElement(_Tooltip, {
      title: '全屏'
    }, /*#__PURE__*/React.createElement(FullscreenOutlined, null));
  }, [fullscreen]);
};

export default FullScreenIcon;