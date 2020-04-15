/**
 * 通过配置生成api service，供简单使用
 */
import { RequestOptionsInit } from 'umi-request';
export interface JsonApi {
    method?: string;
    path: string;
    options?: RequestOptionsInit;
}
export interface ApiService<T = any> {
    request: (data?: object) => Promise<T>;
    cancel: () => void;
}
declare const generateApi: <T>({ method, path, options }: JsonApi) => ApiService<T>;
declare const api: {
    get: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    post: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    delete: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    put: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    patch: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    head: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    options: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
    rpc: (path: string, options?: RequestOptionsInit) => ApiService<unknown>;
};
export default api;
export { generateApi };
