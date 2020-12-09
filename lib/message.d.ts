import { ArgsProps, ConfigOnClose } from 'antd/es/message';
import * as React from 'react';
declare const message: {
    info: (content: React.ReactNode | string | ArgsProps, duration?: number | (() => void), onClose?: ConfigOnClose) => import("antd/lib/message").MessageType;
    success: (content: React.ReactNode | string | ArgsProps, duration?: number | (() => void), onClose?: ConfigOnClose) => import("antd/lib/message").MessageType;
    error: (content: React.ReactNode | string | ArgsProps, duration?: number | (() => void), onClose?: ConfigOnClose) => import("antd/lib/message").MessageType;
    warn: (content: React.ReactNode | string | ArgsProps, duration?: number | (() => void), onClose?: ConfigOnClose) => import("antd/lib/message").MessageType;
    warning: (content: React.ReactNode | string | ArgsProps, duration?: number | (() => void), onClose?: ConfigOnClose) => import("antd/lib/message").MessageType;
    loading: (content: React.ReactNode | string | ArgsProps, duration?: number | (() => void), onClose?: ConfigOnClose) => import("antd/lib/message").MessageType;
    open: (args: import("antd/lib/message").ArgsProps) => import("antd/lib/message").MessageType;
    config: (options: import("antd/lib/message").ConfigOptions) => void;
    destroy: () => void;
};
export default message;
