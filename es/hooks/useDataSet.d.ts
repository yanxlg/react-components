/// <reference types="react" />
declare function useDataSet<T>(): {
    dataSet: T[];
    setDataSet: import('react').Dispatch<import('react').SetStateAction<T[]>>;
    loading: boolean;
    setLoading: import('react').Dispatch<import('react').SetStateAction<boolean>>;
};
export default useDataSet;
