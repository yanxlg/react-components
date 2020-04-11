import { useState } from 'react';

function useDataSet<T>() {
    const [dataSet, setDataSet] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    return {
        dataSet,
        setDataSet,
        loading,
        setLoading,
    };
}

export default useDataSet;
