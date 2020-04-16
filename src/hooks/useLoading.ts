import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiService, generateApi, JsonApi } from '../api';
import { IResponse } from './useList';
import useLoadingState from './useLoadingState';

function useLoading<T = any>({
    apiService,
    initData,
}: {
    apiService: JsonApi | (() => ApiService<Promise<IResponse<T>>>);
    initData?: T;
}) {
    const [loading, setLoading] = useLoadingState(false);
    const [data, setData] = useState<T>(initData);

    const api = useRef(typeof apiService === 'object' ? generateApi(apiService) : apiService());

    const service = useCallback((data?: any) => {
        api.current.cancel();
        setLoading(true);
        return api.current
            .request(data)
            .then((result: any) => {
                setData(result?.data);
                return result;
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        return () => {
            api.current.cancel();
        };
    }, []);

    return {
        service: service,
        loading: loading,
        data,
        setData,
    };
}

export default useLoading;
