export var isEmptyObject = function isEmptyObject(target) {
  return Object.keys(target).length === 0;
};
export var EmptyObject = {};
export var EmptyArray = [];
export function isNumber(value) {
  return /^\d+$/.test(String(value));
}
export var isEmptyString = function isEmptyString(value) {
  return typeof value === 'string' && value.trim() === '';
};
export var clearEmptyVal = function clearEmptyVal(data, excludeKeys) {
  // formData直接返回
  if (typeof data !== 'object' || data instanceof FormData) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.filter(function (item) {
      return !isEmptyString(item) && item !== undefined && item !== null;
    }).map(function (item) {
      return clearEmptyVal(item, excludeKeys);
    });
  } else {
    var result = {};

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];

        if (excludeKeys && excludeKeys.includes(key)) {
          result[key] = val;
        } else if (!isEmptyString(val) && val !== undefined && val !== null) {
          result[key] = clearEmptyVal(val, excludeKeys);
        }
      }
    }

    return result;
  }
};