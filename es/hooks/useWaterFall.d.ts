import { RefObject } from 'react';
import { JsonFormRef } from '../JsonForm';
export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}
export declare type IPaginationResponse<T, U = {}> = {
    total: number;
    list: T[];
} & U;
declare function useWaterFall<T, Q, E = {}>({ queryPromise, formRef, extraQuery, autoQuery, dependenceKey, }: {
    queryPromise: (query: Q) => Promise<IResponse<IPaginationResponse<T, E>>>;
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: {
        [key: string]: any;
    };
    autoQuery?: boolean;
    dependenceKey?: string;
}): {
    queryRef: import("react").MutableRefObject<object>;
    loading: boolean;
    dataSource: T[];
    total: number;
    setLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setDataSource: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    setTotal: import("react").Dispatch<import("react").SetStateAction<number>>;
    onNext: () => Promise<void>;
    onSearch: () => Promise<void>;
    getListData: ({ id, ...extra }?: {
        [key: string]: any;
        id?: string;
    }) => Promise<void>;
};
export default useWaterFall;
