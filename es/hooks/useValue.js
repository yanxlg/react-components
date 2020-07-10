import { useRef } from 'react';

var useValue = function useValue(value) {
  var valueRef = useRef(value);

  if (value) {
    valueRef.current = value;
  }

  return valueRef.current;
};

export default useValue;