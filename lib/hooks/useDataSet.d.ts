/// <reference types="react" />
declare function useDataSet<T>(): {
    dataSet: T[];
    setDataSet: import('react').Dispatch<import('react').SetStateAction<T[]>>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};
export default useDataSet;
