import { useState } from 'react';
import useLoadingState from './useLoadingState';

function useDataSet<T>() {
    const [dataSet, setDataSet] = useState<T[]>([]);
    const [loading, setLoading] = useLoadingState(false);
    return {
        dataSet,
        setDataSet,
        loading,
        setLoading,
    };
}

export default useDataSet;
