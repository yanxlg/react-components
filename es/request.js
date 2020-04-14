"use strict";
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

/*
import { message, notification } from 'antd';
import { extend, RequestOptionsInit, ResponseError } from 'umi-request';
import { history } from 'umi';
import { parse, stringify } from 'querystring';
import { formatRequestData } from '@/utils/utils';

let messageQueue: string[] = []; // 消息队列 避免重复msg显示

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

const newMessage = (msg: string) => {
    if (!messageQueue.includes(msg)) {
        messageQueue.push(msg);
        message.error(msg, 3, () => {
            messageQueue = messageQueue.filter(one => one !== msg);
        });
    }
};

const codeMessage: { [key: number]: string } = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
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

export const apiCodeMessage = {
    success: 200,
};

/!**
 * 异常处理程序
 *!/

export function errorHandlerFactory(skipError: boolean = false) {
    const errorHandler = (error: {
        response: Response;
        data: any;
        request: {
            url: string;
            options: RequestOptionsInit;
        };
    }) => {
        const { response, data } = error;
        if (response && response.status) {
            if (response.status !== 200) {
                if (response.status === 401) {
                    const msg = '身份已过期，需要重新登录';
                    newMessage(msg);
                    const { redirect } = getPageQuery();
                    if (window.location.pathname !== '/login' && !redirect) {
                        history.replace({
                            pathname: '/login',
                            search: stringify({
                                redirect: window.location.href,
                            }),
                        });
                    }
                } else {
                    const errorText = codeMessage[response.status] || response.statusText;
                    const { status, url } = response;
                    notification.error({
                        message: `请求错误 ${status}: ${url}`,
                        description: errorText,
                    });
                }
            } else {
                if (!skipError && (!data || data.code !== apiCodeMessage.success)) {
                    const msg = (data && data.message) || '接口异常';
                    newMessage(msg);
                }
                return Promise.reject(data); // 所有错误传递到onrejected中，业务层可以进一步处理
            }
        } else if (!response) {
            notification.error({
                description: '您的网络发生异常，无法连接服务器',
                message: '网络异常',
            });
        }
        return Promise.reject({
            status: response.status,
            msg: response.statusText,
        });
    };
    return errorHandler;
}

/!**
 * 配置request请求时的默认参数
 *!/
const request = extend({
    errorHandler: errorHandlerFactory(), // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.response.use(async (response: Response, options: RequestOptionsInit) => {
    if (!options.responseType || options.responseType === 'json') {
        try {
            const data = await response.clone().json();
            // code !== 0 当作error处理
            if (!data || data.code !== apiCodeMessage.success) {
                return Promise.reject(
                    // @ts-ignore
                    new ResponseError<any>(
                        response,
                        'data Error',
                        data,
                        {
                            url: response.url,
                            options,
                        },
                        'DataError',
                    ),
                ); // invalid user 不传递到业务层
            }
            return response;
        } catch (error) {
            return Promise.reject(
                // @ts-ignore
                new ResponseError<any>(
                    response,
                    'parse Error',
                    null,
                    {
                        url: response.url,
                        options,
                    },
                    'ParseError',
                ),
            ); // invalid user 不传递到业务层
        }
    }
    return response;
});

const requestId = function() {
    return Date.now() + '' + Math.ceil(Math.random() * 100000);
};

// 登录身份设置
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
    if (User.token) {
        options.headers = Object.assign({}, options.headers, {
            'X-Token': User.token,
            request_id: requestId(),
        });
    }
    return {
        url,
        options,
    };
});

// 参数过滤 '' undefined null
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
    const { params, data } = options;
    return {
        url,
        options: {
            ...options,
            data: formatRequestData(data),
            params: formatRequestData(params),
        },
    };
});

export default request;
*/