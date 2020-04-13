function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var config = {
  defaultPageNumber: 1,
  defaultPageSize: 50,
  defaultPageNumberKey: 'page',
  defaultPageSizeKey: 'page_count'
};

var Config = function Config(conf) {
  _extends(config, conf);
};

export default Config;
export { config };