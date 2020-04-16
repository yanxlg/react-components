import { RefObject } from 'react';
import { JsonFormRef } from '../JsonForm';
import { ApiService, JsonApi } from '../api';
export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}
export declare type IPaginationResponse<T, U = {}> = {
    total: number;
    list: T[];
} & U;
/**
 *
 * @param queryPromise api service
 * @param formRef form表单实例
 * @param extraQuery 额外的api参数
 * @param autoQuery 是否立即执行api
 * @param dependenceKey 瀑布流依赖字段key
 * @param size 瀑布流获取长度
 */
declare function useWaterFall<T = any, Q = any, E = {}>({ queryPromise, formRef, extraQuery, autoQuery, dependenceKey, size, }: {
    queryPromise: JsonApi | ((query: Q) => ApiService<Promise<IResponse<IPaginationResponse<T, E>>>>);
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: {
        [key: string]: any;
    };
    autoQuery?: boolean;
    dependenceKey?: string;
    size?: number;
}): {
    queryRef: import("react").MutableRefObject<object>;
    hasMoreRef: import("react").MutableRefObject<boolean>;
    loading: boolean;
    dataSource: T[];
    increment: T[];
    total: number;
    setLoading: (loading: boolean) => void;
    setDataSource: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    setTotal: import("react").Dispatch<import("react").SetStateAction<number>>;
    onNext: () => Promise<void>;
    onSearch: () => Promise<void>;
    getListData: ({ id, ...extra }?: {
        [key: string]: any;
        id?: string;
        size?: number;
    }) => Promise<void>;
};
export default useWaterFall;
