import { useCallback, useState } from 'react';

function useModal2() {
  var _a = useState(false),
      visible = _a[0],
      setVisible = _a[1];

  var setHide = useCallback(function () {
    setVisible(false);
  }, []);
  var setShow = useCallback(function (visible) {
    setVisible(visible);
  }, []);
  return [visible, setShow, setHide];
}

export default useModal2;