import { ArgsProps, ConfigOnClose } from 'antd/es/message';
import * as React from 'react';
declare const message: {
    info: (
        content:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<
                  any,
                  | string
                  | ((
                        props: any,
                    ) => React.ReactElement<
                        any,
                        string | any | (new (props: any) => React.Component<any, any, any>)
                    >)
                  | (new (props: any) => React.Component<any, any, any>)
              >
            | React.ReactNodeArray
            | React.ReactPortal
            | ArgsProps,
        duration?: number | (() => void),
        onClose?: ConfigOnClose,
    ) => import('antd/lib/message').MessageType;
    success: (
        content:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<
                  any,
                  | string
                  | ((
                        props: any,
                    ) => React.ReactElement<
                        any,
                        string | any | (new (props: any) => React.Component<any, any, any>)
                    >)
                  | (new (props: any) => React.Component<any, any, any>)
              >
            | React.ReactNodeArray
            | React.ReactPortal
            | ArgsProps,
        duration?: number | (() => void),
        onClose?: ConfigOnClose,
    ) => import('antd/lib/message').MessageType;
    error: (
        content:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<
                  any,
                  | string
                  | ((
                        props: any,
                    ) => React.ReactElement<
                        any,
                        string | any | (new (props: any) => React.Component<any, any, any>)
                    >)
                  | (new (props: any) => React.Component<any, any, any>)
              >
            | React.ReactNodeArray
            | React.ReactPortal
            | ArgsProps,
        duration?: number | (() => void),
        onClose?: ConfigOnClose,
    ) => import('antd/lib/message').MessageType;
    warn: (
        content:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<
                  any,
                  | string
                  | ((
                        props: any,
                    ) => React.ReactElement<
                        any,
                        string | any | (new (props: any) => React.Component<any, any, any>)
                    >)
                  | (new (props: any) => React.Component<any, any, any>)
              >
            | React.ReactNodeArray
            | React.ReactPortal
            | ArgsProps,
        duration?: number | (() => void),
        onClose?: ConfigOnClose,
    ) => import('antd/lib/message').MessageType;
    warning: (
        content:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<
                  any,
                  | string
                  | ((
                        props: any,
                    ) => React.ReactElement<
                        any,
                        string | any | (new (props: any) => React.Component<any, any, any>)
                    >)
                  | (new (props: any) => React.Component<any, any, any>)
              >
            | React.ReactNodeArray
            | React.ReactPortal
            | ArgsProps,
        duration?: number | (() => void),
        onClose?: ConfigOnClose,
    ) => import('antd/lib/message').MessageType;
    loading: (
        content:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<
                  any,
                  | string
                  | ((
                        props: any,
                    ) => React.ReactElement<
                        any,
                        string | any | (new (props: any) => React.Component<any, any, any>)
                    >)
                  | (new (props: any) => React.Component<any, any, any>)
              >
            | React.ReactNodeArray
            | React.ReactPortal
            | ArgsProps,
        duration?: number | (() => void),
        onClose?: ConfigOnClose,
    ) => import('antd/lib/message').MessageType;
    open: (args: import('antd/lib/message').ArgsProps) => import('antd/lib/message').MessageType;
    config: (options: import('antd/lib/message').ConfigOptions) => void;
    destroy: () => void;
};
export default message;
