import { RefObject, useRef, useState, useCallback, useEffect } from 'react';
import { JsonFormRef } from '../JsonForm';
import { config } from '../Config';
import { EmptyArray, EmptyObject } from '../utils';
import { ApiService, generateApi, JsonApi } from '../api';
import useLoadingState from './useLoadingState';
import { TablePaginationConfig } from 'antd/lib/table/interface';

export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}

export type IPaginationResponse<T, U = {}> = {
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
function useList<T, Q = any, E = {}>({
    queryList,
    formRef,
    extraQuery,
    defaultState,
    autoQuery = true,
    pageNumberKey = config.defaultPageNumberKey,
    pageSizeKey = config.defaultPageSizeKey,
    convertQuery,
}: {
    queryList: JsonApi | ((query: Q) => ApiService<IResponse<IPaginationResponse<T, E>>>);
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: { [key: string]: any };
    defaultState?: { pageNumber?: number; pageSize?: number };
    autoQuery?: boolean;
    pageNumberKey?: string;
    pageSizeKey?: string;
    convertQuery?(query: object): object;
}) {
    const [loading, setLoading] = useLoadingState();
    const extraQueryRef = useRef<{ [key: string]: any } | undefined>(undefined);
    extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

    const pageNumber = useRef<number>(defaultState?.pageNumber ?? config.defaultPageNumber);
    const pageSize = useRef<number>(defaultState?.pageSize ?? config.defaultPageSize);

    const [dataSource, setDataSource] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [extraData, setExtraData] = useState<E | undefined>(undefined);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(EmptyArray);

    const req = useRef<ApiService>();

    const query = useRef<object>({});
    const setQuery = useCallback((nextQuery: object) => {
        query.current = nextQuery;
    }, []);

    const getListData = useCallback(
        ({
            page = pageNumber.current,
            page_count = pageSize.current,
            ...extra
        }: { page?: number; page_count?: number; [key: string]: any } = {}) => {
            // 这边终止请求？？
            if (req.current) {
                req.current.cancel();
                req.current = undefined;
            }

            return Promise.resolve()
                .then(() => {
                    if (formRef) {
                        if (Array.isArray(formRef)) {
                            return Promise.all(
                                formRef.map(form => form.current!.validateFields()),
                            ).then(valueArray => {
                                return Object.assign({}, ...valueArray);
                            });
                        } else {
                            return formRef.current!.validateFields();
                        }
                    } else {
                        return undefined;
                    }
                })
                .then(formValues => {
                    setLoading(true);
                    let query = {
                        [pageNumberKey]: page,
                        [pageSizeKey]: page_count,
                        ...extra,
                        ...formValues,
                    };
                    if (convertQuery) {
                        query = convertQuery(query);
                    }
                    setSelectedRowKeys(EmptyArray);
                    req.current =
                        typeof queryList === 'object'
                            ? generateApi(queryList)
                            : queryList(query as Q);
                    const request =
                        typeof queryList === 'object'
                            ? req.current.request((query as unknown) as object)
                            : req.current.request();
                    return request
                        .then(({ data: { total = 0, list = [], ...extraData } = EmptyObject }) => {
                            setQuery(query);
                            pageNumber.current = page;
                            pageSize.current = page_count;
                            setDataSource(list);
                            setTotal(total);
                            setExtraData(extraData as E);
                        }) //TODO  失败的交互应该是怎样
                        .finally(() => {
                            setLoading(false);
                        });
                });
        },
        [],
    );

    const onReload = useCallback(
        () =>
            getListData({
                ...extraQueryRef.current,
            }),
        [],
    );

    const onSearch = useCallback(
        () =>
            getListData({
                page: 1,
                page_count: defaultState?.pageSize ?? config.defaultPageSize,
                ...extraQueryRef.current,
            }),
        [],
    );

    const onChange = useCallback(
        ({ current, pageSize }: TablePaginationConfig, filters, sorter) => {
            const sorterConfig =
                sorter && sorter.field
                    ? {
                          sort_by: sorter.field,
                          sort_order: sorter.order,
                      }
                    : {};
            return getListData({
                page: sorter && sorter.field ? 1 : current,
                page_count: pageSize,
                ...sorterConfig,
                ...extraQueryRef.current,
            });
        },
        [],
    );

    useEffect(() => {
        autoQuery && onSearch();
        return () => {
            if (req.current) {
                req.current.cancel();
                req.current = undefined;
            }
        };
    }, []);

    const setPageSize = useCallback((size: number) => {
        pageSize.current = size;
    }, []);

    const setPageNumber = useCallback((current: number) => {
        pageNumber.current = current;
    }, []);

    return {
        queryRef: query,
        pageNumberRef: pageNumber,
        pageSizeRef: pageSize,
        /**
         * @deprecated
         **/
        query: query.current,
        pageNumber: pageNumber.current,
        pageSize: pageSize.current,
        loading,
        dataSource,
        extraData,
        total,
        setLoading,
        setDataSource,
        selectedRowKeys,
        setTotal,
        onReload,
        onSearch,
        onChange,
        getListData,
        setSelectedRowKeys,
        setPageSize,
        setPageNumber,
    };
}

export default useList;
