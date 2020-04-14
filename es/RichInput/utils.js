export var numberFormatter = function numberFormatter(value) {
  return typeof value === 'number' ? String(value) : value ? (/^\d+(\.\d*)?/.exec(value) || [''])[0] : '';
};
export var intFormatter = function intFormatter(value) {
  return typeof value === 'number' ? String(value) : value ? (/^\d+/.exec(value) || [''])[0] : '';
};
export var positiveIntFormatter = function positiveIntFormatter(value) {
  return typeof value === 'number' ? String(value) : value ? (/^[1-9]\d*/.exec(value) || [''])[0] : '';
};