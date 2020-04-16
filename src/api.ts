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
    ): ApiService<T>;
}

const noloop = (value: any) => value;

const generateApi = <T = any>({ method = 'get', path, options }: JsonApi): ApiService<T> => {
    const { token, cancel } = CancelToken.source(); // umi-request abort
    let _onfulfilled: any;
    const service = {
        request: (data?: object) => {
            let _options: any;
            const key = method.toLowerCase() === 'get' ? 'params' : 'data';
            if (options?.[key] || data) {
                _options = {
                    [key]: {
                        ...options?.[key],
                        ...data,
                    },
                };
            }
            if (_onfulfilled) {
                return request[method]<T>(
                    path,
                    Object.assign({}, options, _options, {
                        cancelToken: token,
                    }),
                ).then(_onfulfilled);
            } else {
                return request[method]<T>(
                    path,
                    Object.assign({}, options, _options, {
                        cancelToken: token,
                    }),
                );
            }
        },
        cancel: () => {
            cancel('by code');
        },
        then: <TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        ) => {
            _onfulfilled = onfulfilled || noloop;
            return service;
        },
    };
    return service;
};

const api = {
    get: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'get',
            path,
            options,
        });
    },
    post: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'post',
            path,
            options,
        });
    },
    delete: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'delete',
            path,
            options,
        });
    },
    put: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'put',
            path,
            options,
        });
    },
    patch: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'patch',
            path,
            options,
        });
    },
    head: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'head',
            path,
            options,
        });
    },
    options: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'options',
            path,
            options,
        });
    },
    rpc: <T = any>(path: string, options?: RequestOptionsInit) => {
        return generateApi<T>({
            method: 'rpc',
            path,
            options,
        });
    },
};

export default api;

export { generateApi };
