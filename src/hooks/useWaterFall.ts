import { RefObject, useRef, useState, useCallback, useEffect } from 'react';
import { JsonFormRef } from '../JsonForm';
import { EmptyObject } from '../utils';

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
}: {
    queryPromise: (query: Q) => Promise<IResponse<IPaginationResponse<T, E>>>;
    formRef?: RefObject<JsonFormRef> | Array<RefObject<JsonFormRef>>;
    extraQuery?: { [key: string]: any };
    autoQuery?: boolean;
    dependenceKey?: string;
}) {
    const [loading, setLoading] = useState(autoQuery);

    const extraQueryRef = useRef<{ [key: string]: any } | undefined>(undefined);
    extraQueryRef.current = extraQuery; // extraQuery支持外部更新，每次覆盖

    const [dataSource, setDataSource] = useState<T[]>([]);
    const [total, setTotal] = useState(0);

    const query = useRef<object>({});

    const dataSourceRef = useRef(dataSource);

    dataSourceRef.current = dataSource; // 直接读取

    const setQuery = useCallback((nextQuery: object) => {
        query.current = nextQuery;
    }, []);

    const getListData = useCallback(
        ({ id, ...extra }: { id?: string; [key: string]: any } = {}) => {
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
                        ...extra,
                        ...formValues,
                    };
                    return queryPromise({ ...query, [dependenceKey]: id } as Q)
                        .then(({ data: { total = 0, list = [] } = EmptyObject }) => {
                            setQuery(query);
                            setTotal(total);
                            setDataSource([].concat(dataSourceRef.current).concat(list));
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                });
        },
        [],
    );

    const onSearch = useCallback(
        () =>
            getListData({
                ...extraQueryRef.current,
            }),
        [],
    );

    const onNext = useCallback(() => {
        const item = dataSourceRef.current[dataSourceRef.current.length - 1];
        const id = item?.[dependenceKey];
        return getListData({
            id,
            ...extraQueryRef.current,
        });
    }, []);

    useEffect(() => {
        autoQuery && onSearch();
    }, []);

    return {
        queryRef: query,
        loading,
        dataSource,
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
