import { RefObject, useRef, useState, useCallback, useEffect } from 'react';
import { JsonFormRef } from '../JsonForm';
import { EmptyObject } from '../utils';
import { config } from '../Config';

export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}

export type IPaginationResponse<T, U = {}> = {
    total: number;
    list: T[];
} & U;

function useWaterFall<T, Q, E = {}>({
    queryPromise,
    formRef,
    extraQuery,
    autoQuery = true,
    dependenceKey = 'id',
    size = config.defaultWaterFallSize,
}: {
    queryPromise: (query: Q) => Promise<IResponse<IPaginationResponse<T, E>>>;
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: { [key: string]: any };
    autoQuery?: boolean;
    dependenceKey?: string;
    size?: number;
}) {
    const [loading, setLoading] = useState(autoQuery);

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

    const getListData = useCallback(
        ({ id, ...extra }: { id?: string; size?: number; [key: string]: any } = {}) => {
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
                    return queryPromise({ ...query, [dependenceKey]: id } as Q)
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
