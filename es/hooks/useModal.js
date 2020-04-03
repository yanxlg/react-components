import { useCallback, useState } from "react";

function useModal() {
  var _a = useState(false),
      visible = _a[0],
      setVisible = _a[1];

  var onClose = useCallback(function () {
    setVisible(false);
  }, []);
  var setVisibleProps = useCallback(function (visibleProps) {
    setVisible(visibleProps);
  }, []);
  return {
    visible: visible,
    onClose: onClose,
    setVisibleProps: setVisibleProps
  };
}

export default useModal;