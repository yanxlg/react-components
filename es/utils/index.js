export var isEmptyObject = function isEmptyObject(target) {
  return Object.keys(target).length === 0;
};
export var EmptyObject = {};
export var EmptyArray = [];
export function isNumber(value) {
  return /^\d+$/.test(String(value));
}