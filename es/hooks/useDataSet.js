import { useState } from "react";

function useDataSet() {
  var _a = useState([]),
      dataSet = _a[0],
      setDataSet = _a[1];

  var _b = useState(false),
      loading = _b[0],
      setLoading = _b[1];

  return {
    dataSet: dataSet,
    setDataSet: setDataSet,
    loading: loading,
    setLoading: setLoading
  };
}

export default useDataSet;