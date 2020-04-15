import { message as AntdMessage } from 'antd';
import { ArgsProps, ConfigOnClose, MessageType } from 'antd/es/message';
import * as React from 'react';

const cache: { [key: string]: MessageType } = {} as any;

const generateMessage = (
    type: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'loading',
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    const instance = cache[content as any];
    if (instance) {
        instance(); // 关闭之前的，重新显示新的message
    }
    let newInstance = AntdMessage[type](content, duration, () => {
        onClose();
        delete cache[content as any];
    });
    cache[content as any] = newInstance;
    return newInstance;
};

const info = (
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    return generateMessage('info', content, duration, onClose);
};

const success = (
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    return generateMessage('success', content, duration, onClose);
};

const error = (
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    return generateMessage('error', content, duration, onClose);
};
const warn = (
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    return generateMessage('warn', content, duration, onClose);
};
const warning = (
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    return generateMessage('warning', content, duration, onClose);
};
const loading = (
    content: React.ReactNode | string | ArgsProps,
    duration?: number | (() => void),
    onClose?: ConfigOnClose,
) => {
    return generateMessage('loading', content, duration, onClose);
};

const message = {
    info: info,
    success: success,
    error: error,
    warn: warn,
    warning: warning,
    loading: loading,
    open: AntdMessage.open,
    config: AntdMessage.config,
    destroy: AntdMessage.destroy,
};

export default message;
