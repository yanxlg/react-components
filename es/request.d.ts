/**
 * request 网络请求工具
 * request 需要支持cancel，并提供hooks 实现unmount 自动cancel；默认使用request，支持传入自定义request
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { RequestMethod } from 'umi-request';
declare module 'umi-request' {
    interface RequestMethod {
        replace: (request: RequestMethod) => void;
    }
}
declare let request: RequestMethod<false>;
export default request;
