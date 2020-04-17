/**
 * request 网络请求工具
 * request 需要支持cancel，并提供hooks 实现unmount 自动cancel；默认使用request，支持传入自定义request
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { default as Request, extend, RequestMethod, RequestOptionsInit } from 'umi-request';
import message from './message';
import { clearEmptyVal } from './utils';
import AbortController from 'abort-controller';

declare module 'umi-request' {
    interface RequestMethod {
        replace: (request: RequestMethod) => void;
    }
    interface RequestOptionsInit {
        skipResponseInterceptors?: boolean; // 是否跳过内部错误判断
    }
}

// 添加默认行为
const codeMessage: { [key: number]: string } = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '请求地址不存在。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const requestId = function() {
    return Date.now() + '' + Math.ceil(Math.random() * 100000);
};

const successReg = /^200|success$/;

function addDefaultInterceptors(req: RequestMethod) {
    req.interceptors.response.use(async (response, options) => {
        const skipResponseInterceptors = options?.skipResponseInterceptors;
        if (!response) {
            !skipResponseInterceptors && message.error('服务异常，无结果返回！');
            return response;
        }
        const { status } = response;
        if (status < 200 || status >= 300) {
            // 错误码
            const msg = codeMessage[status];
            !skipResponseInterceptors && msg && message.error(`${status}：${msg}`);
            return response;
        }

        const { responseType } = options;
        if (responseType === void 0 || responseType === 'json') {
            // json数据，默认解析判断数据结构
            try {
                const data = await response.clone().json();
                const state = data.code || data.status || data.state; // 支持code和status及state三个字段进行校验
                const msg = data.msg || data.message || data.error; // 错误信息
                if (!successReg.test(String(state))) {
                    !skipResponseInterceptors && message.error(msg);
                    throw data;
                }
                return response;
            } catch (error) {
                // 结果存在问题，类似no response 进行处理
                !skipResponseInterceptors && message.error('服务异常，返回结果无法解析！');
                throw response;
            }
        }
        return response;
    });
    req.interceptors.request.use((url: string, options: RequestOptionsInit) => {
        options.headers = Object.assign({}, options.headers, {
            request_id: requestId(),
        });
        const { params, data, ...extra } = options;
        return {
            url,
            options: {
                ...extra,
                params: params ? clearEmptyVal(params) : undefined,
                data: data ? clearEmptyVal(data) : undefined,
            },
        };
    });
    // 处理abort 逻辑
    req.interceptors.request.use((url: string, options: RequestOptionsInit) => {
        if (options?.cancelToken) {
            const controller = new AbortController(); // fetch abort
            const signal = controller.signal;
            options.cancelToken.promise.then(() => {
                controller.abort();
            });
            return {
                url,
                options: {
                    ...options,
                    signal,
                },
            };
        } else {
            return {
                url,
                options,
            };
        }
    });
}

let request = extend({
    errorHandler: err => {
        if (request.isCancel(err) || (typeof err === 'object' && /abort/.test(err.message))) {
            throw new Request.Cancel(err.message); // abort统一抛出异常，不进行处理
        }
        throw err;
    },
});

addDefaultInterceptors(request);

const replace = function(customReq: RequestMethod, useDefaultInterceptors = true) {
    request = customReq;
    request.replace = replace;
    if (useDefaultInterceptors) {
        // 重新绑定拦截器
        addDefaultInterceptors(request);
    }
};

request.replace = replace;

export default request;
