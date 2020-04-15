export var isEmptyObject = function isEmptyObject(target) {
  return Object.keys(target).length === 0;
};
export var EmptyObject = {};
export var EmptyArray = [];
export function isNumber(value) {
  return /^\d+$/.test(String(value));
}
export var clearEmptyVal = function clearEmptyVal(data) {
  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.filter(function (item) {
      return item !== '' && item !== undefined && item !== null;
    }).map(function (item) {
      return clearEmptyVal(item);
    });
  } else {
    var result = {};

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];

        if (val !== '' && val !== undefined && val !== null) {
          result[key] = clearEmptyVal(val);
        }
      }
    }

    return result;
  }
};