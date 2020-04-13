import React, { ReactText } from 'react';
import { DataIndex } from 'rc-table/lib/interface';
/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 Status
 * @param text
 * @param valueEnum
 * @param prue 纯净模式，不增加 status
 */
export declare const parsingText: (text: string | number, valueEnum?: {
    [key: string]: string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | {
        text: React.ReactNode;
        type: "Success" | "Error" | "Processing" | "Default" | "Warning";
    };
}, pure?: boolean) => {};
/**
 * 把 value 的枚举转化为 数组
 * @param valueEnum
 */
export declare const parsingValueEnumToArray: (valueEnum?: {
    [key: string]: string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | {
        text: React.ReactNode;
        type: "Success" | "Error" | "Processing" | "Default" | "Warning";
    };
}) => {
    value: string;
    text: string;
}[];
/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */
export declare const checkUndefinedOrNull: (value: any) => boolean;
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies?: Object): void;
export declare function getProgressStatus(text: number): 'success' | 'exception' | 'normal' | 'active';
/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key
 * @param dataIndex
 */
export declare const genColumnKey: (key?: string | number, dataIndex?: DataIndex) => string | number;
export default function get(entity: any, path: ReactText | ReactText[]): any;
