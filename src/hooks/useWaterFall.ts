import { RefObject, useRef, useState, useCallback, useEffect } from 'react';
import { JsonFormRef } from '../JsonForm';
import { EmptyObject } from '../utils';
import { config } from '../Config';
import { ApiService, generateApi, JsonApi } from '../api';
import useLoadingState from './useLoadingState';

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
 *
 * @param queryPromise api service
 * @param formRef form表单实例
 * @param extraQuery 额外的api参数
 * @param autoQuery 是否立即执行api
 * @param dependenceKey 瀑布流依赖字段key
 * @param size 瀑布流获取长度
 */
function useWaterFall<T = any, Q = any, E = {}>({
    queryPromise,
    formRef,
    extraQuery,
    autoQuery = true,
    dependenceKey = 'id',
    size = config.defaultWaterFallSize,
}: {
    queryPromise:
        | JsonApi
        | ((query: Q) => ApiService<Promise<IResponse<IPaginationResponse<T, E>>>>);
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: { [key: string]: any };
    autoQuery?: boolean;
    dependenceKey?: string;
    size?: number;
}) {
    const [loading, setLoading] = useLoadingState();

    const extraQueryRef = useRef<{ [key: string]: any } | undefined>(undefined);
    extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

    const [dataSource, setDataSource] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [increment, setIncrement] = useState<T[]>([]);

    const query = useRef<object>({});

    const dataSourceRef = useRef(dataSource);

    dataSourceRef.current = dataSource; // 直接读取

    const hasMoreRef = useRef(true);

    const setQuery = useCallback((nextQuery: object) => {
        query.current = nextQuery;
    }, []);

    const req = useRef<ApiService>();

    const getListData = useCallback(
        ({ id, ...extra }: { id?: string; size?: number; [key: string]: any } = {}) => {
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
                    const query = {
                        size,
                        ...extra,
                        ...formValues,
                    };
                    req.current =
                        typeof queryPromise === 'object'
                            ? generateApi(queryPromise)
                            : queryPromise(query as Q);
                    const request =
                        typeof queryPromise === 'object'
                            ? req.current.request((query as unknown) as object)
                            : req.current.request();

                    return request
                        .then(({ data: { total = 0, list = [] } = EmptyObject }) => {
                            setQuery(query);
                            setTotal(total);
                            setIncrement(list);
                            setDataSource([].concat(dataSourceRef.current).concat(list));
                            hasMoreRef.current = list.length >= size;
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                });
        },
        [],
    );

    const onSearch = useCallback(() => {
        hasMoreRef.current = true;
        return getListData({
            ...extraQueryRef.current,
        });
    }, []);

    const onNext = useCallback(() => {
        if (hasMoreRef.current) {
            const item = dataSourceRef.current[dataSourceRef.current.length - 1];
            const id = item?.[dependenceKey];
            return getListData({
                id,
                ...extraQueryRef.current,
            });
        } else {
            return Promise.resolve();
        }
    }, []);

    useEffect(() => {
        autoQuery && onSearch();
        return () => {
            if (req.current) {
                req.current.cancel();
                req.current = undefined;
            }
        };
    }, []);

    return {
        queryRef: query,
        hasMoreRef: hasMoreRef,
        loading,
        dataSource,
        increment, // for optimize render
        total,
        setLoading,
        setDataSource,
        setTotal,
        onNext,
        onSearch,
        getListData,
    };
}

export default useWaterFall;
