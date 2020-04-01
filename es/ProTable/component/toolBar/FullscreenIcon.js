import React, { useEffect, useMemo, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

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
    return fullscreen ? React.createElement(Tooltip, {
      title: '退出全屏'
    }, React.createElement(FullscreenExitOutlined, null)) : React.createElement(Tooltip, {
      title: '全屏'
    }, React.createElement(FullscreenOutlined, null));
  }, [fullscreen]);
};

export default FullScreenIcon;