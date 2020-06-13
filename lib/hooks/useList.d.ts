import { RefObject } from 'react';
import { JsonFormRef } from '../JsonForm';
import { ApiService, JsonApi } from '../api';
import { TablePaginationConfig } from 'antd/lib/table/interface';
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
 * 通用列表业务hook
 * @param queryList
 * @param formRef
 * @param extraQuery
 * @param defaultState
 * @param autoQuery
 * @param pageNumberKey
 * @param pageSizeKey
 * @param convertQuery
 */
declare function useList<T, Q = any, E = {}>({ queryList, formRef, extraQuery, defaultState, autoQuery, pageNumberKey, pageSizeKey, convertQuery, }: {
    queryList: JsonApi | ((query: Q) => ApiService<IResponse<IPaginationResponse<T, E>>>);
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: {
        [key: string]: any;
    };
    defaultState?: {
        pageNumber?: number;
        pageSize?: number;
    };
    autoQuery?: boolean;
    pageNumberKey?: string;
    pageSizeKey?: string;
    convertQuery?(query: object): object;
}): {
    queryRef: import("react").MutableRefObject<object>;
    pageNumberRef: import("react").MutableRefObject<number>;
    pageSizeRef: import("react").MutableRefObject<number>;
    /**
     * @deprecated
     **/
    query: object;
    pageNumber: number;
    pageSize: number;
    loading: boolean;
    dataSource: T[];
    extraData: E;
    total: number;
    setLoading: (loading: boolean) => void;
    setDataSource: import("react").Dispatch<import("react").SetStateAction<T[]>>;
    selectedRowKeys: string[];
    setTotal: import("react").Dispatch<import("react").SetStateAction<number>>;
    onReload: () => Promise<void>;
    onSearch: () => Promise<void>;
    onChange: ({ current, pageSize }: TablePaginationConfig, filters: any, sorter: any) => Promise<void>;
    getListData: ({ page, page_count, ...extra }?: {
        [key: string]: any;
        page?: number;
        page_count?: number;
    }) => Promise<void>;
    setSelectedRowKeys: import("react").Dispatch<import("react").SetStateAction<string[]>>;
    setPageSize: (size: number) => void;
    setPageNumber: (current: number) => void;
};
export default useList;
