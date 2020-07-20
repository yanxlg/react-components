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

function addOn(init) {
  var plugin = __assign(__assign({}, init), {
    extend: extend
  });

  function extend(extend) {
    for (var key in extend) {
      plugin[key] = extend[key];
    }
  }

  return plugin;
}

export default addOn;