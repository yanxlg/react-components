import { RefObject } from 'react';
import { JsonFormRef } from '../JsonForm';
import { PaginationConfig } from 'antd/es/pagination';
export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}
export declare type IPaginationResponse<T, U = {}> = {
    total: number;
    list: T[];
} & U;
declare function useList<T, Q, E = {}>({
    queryList,
    formRef,
    extraQuery,
    defaultState,
    autoQuery,
    pageNumberKey,
    pageSizeKey,
}: {
    queryList: (query: Q) => Promise<IResponse<IPaginationResponse<T, E>>>;
    formRef?: RefObject<JsonFormRef>;
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
}): {
    readonly query: object;
    readonly pageNumber: number;
    readonly pageSize: number;
    loading: boolean;
    dataSource: T[];
    extraData: E;
    total: number;
    setLoading: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    setDataSource: import('react').Dispatch<import('react').SetStateAction<T[]>>;
    selectedRowKeys: string[];
    setTotal: import('react').Dispatch<import('react').SetStateAction<number>>;
    onReload: () => Promise<void>;
    onSearch: () => Promise<void>;
    onChange: ({ current, pageSize }: PaginationConfig, filters: any, sorter: any) => Promise<void>;
    getListData: ({
        page,
        page_count,
        ...extra
    }?: {
        [key: string]: any;
        page?: number;
        page_count?: number;
    }) => Promise<void>;
    setSelectedRowKeys: import('react').Dispatch<import('react').SetStateAction<string[]>>;
    setPageSize: (size: number) => void;
    setPageNumber: (current: number) => void;
};
export default useList;
