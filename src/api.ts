/**
 * 通过配置生成api service，供简单使用
 */
import Request, { RequestOptionsInit } from 'umi-request';
import request from './request';

const CancelToken = Request.CancelToken;

export interface JsonApi {
    method?: string;
    path: string;
    options?: RequestOptionsInit;
}

export interface ApiService<T = any> {
    request: (data?: object) => Promise<T>;
    cancel: () => void;
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): ApiService<T>;
}

const generateApi = <T>({ method = 'get', path, options }: JsonApi): ApiService<T> => {
    const { token, cancel } = CancelToken.source();
    let _onfulfilled = (value: any) => value,
        _onrejected = (value: any) => value;
    const service = {
        request: (data?: object) => {
            let _options: any;
            const key = method === 'get' ? 'params' : 'data';
            if ((options && options[key]) || data) {
                _options = {
                    [key]: {
                        ...options[key],
                        ...data,
                    },
                };
            }
            return request[method]<T>(
                path,
                Object.assign({}, options, _options, {
                    cancelToken: token,
                }),
            ).then(_onfulfilled, _onrejected);
        },
        cancel: () => {
            cancel('by code');
        },
        then: <TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ) => {
            _onfulfilled = onfulfilled;
            _onrejected = onrejected;
            return service;
        },
    };
    return service;
};

const api = {
    get: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'get',
            path,
            options,
        });
    },
    post: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'post',
            path,
            options,
        });
    },
    delete: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'delete',
            path,
            options,
        });
    },
    put: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'put',
            path,
            options,
        });
    },
    patch: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'patch',
            path,
            options,
        });
    },
    head: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'head',
            path,
            options,
        });
    },
    options: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'options',
            path,
            options,
        });
    },
    rpc: (path: string, options?: RequestOptionsInit) => {
        return generateApi({
            method: 'rpc',
            path,
            options,
        });
    },
};

export default api;

export { generateApi };
