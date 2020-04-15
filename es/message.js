import "antd/es/message/style/css";
import _message from "antd/es/message";
var cache = {};

var generateMessage = function generateMessage(type, content, duration, onClose) {
  var instance = cache[content];

  if (instance) {
    instance(); // 关闭之前的，重新显示新的message
  }

  var newInstance = _message[type](content, duration, function () {
    onClose();
    delete cache[content];
  });

  cache[content] = newInstance;
  return newInstance;
};

var info = function info(content, duration, onClose) {
  return generateMessage('info', content, duration, onClose);
};

var success = function success(content, duration, onClose) {
  return generateMessage('success', content, duration, onClose);
};

var error = function error(content, duration, onClose) {
  return generateMessage('error', content, duration, onClose);
};

var warn = function warn(content, duration, onClose) {
  return generateMessage('warn', content, duration, onClose);
};

var warning = function warning(content, duration, onClose) {
  return generateMessage('warning', content, duration, onClose);
};

var loading = function loading(content, duration, onClose) {
  return generateMessage('loading', content, duration, onClose);
};

var message = {
  info: info,
  success: success,
  error: error,
  warn: warn,
  warning: warning,
  loading: loading,
  open: _message.open,
  config: _message.config,
  destroy: _message.destroy
};
export default message;