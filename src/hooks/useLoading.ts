import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiService, generateApi, JsonApi } from '../api';
import Request from 'umi-request';
import { IResponse } from './useList';

function useLoading<T = any>({
    apiService,
    initData,
}: {
    apiService: JsonApi | (() => ApiService<Promise<IResponse<T>>>);
    initData?: T;
}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>(initData);

    const api = useRef(typeof apiService === 'object' ? generateApi(apiService) : apiService());

    const service = useCallback((data?: any) => {
        api.current.cancel();
        setLoading(true);
        return api.current.request(data).then(
            (result: any) => {
                setData(result?.data);
                setLoading(false);
                return result;
            },
            err => {
                if (Request.isCancel(err)) {
                    throw err;
                } else {
                    setLoading(false);
                    throw err;
                }
            },
        );
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
