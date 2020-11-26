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
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null): ApiService<T>;
}
declare const generateApi: <T = any>({ method, path, options }: JsonApi) => ApiService<T>;
declare const api: {
    get: <T = any>(path: string, options?: RequestOptionsInit) => ApiService<T>;
    post: <T_1 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_1>;
    delete: <T_2 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_2>;
    put: <T_3 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_3>;
    patch: <T_4 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_4>;
    head: <T_5 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_5>;
    options: <T_6 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_6>;
    rpc: <T_7 = any>(path: string, options?: RequestOptionsInit) => ApiService<T_7>;
};
export default api;
export { generateApi };
