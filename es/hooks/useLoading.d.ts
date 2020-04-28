/// <reference types="react" />
import { ApiService, JsonApi } from '../api';
import { IResponse } from './useList';
declare function useLoading<T = any>({
    apiService,
    initData,
}: {
    apiService: JsonApi | (() => ApiService<Promise<IResponse<T>>>);
    initData?: T;
}): {
    service: (data?: any) => Promise<any>;
    loading: boolean;
    data: T;
    setData: import('react').Dispatch<import('react').SetStateAction<T>>;
};
export default useLoading;
