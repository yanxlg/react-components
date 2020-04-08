import { Moment } from "moment";
export declare const isNull: (value: any) => boolean;
export declare function transNullValue(value?: any): any;
export declare function transJoinStr(value?: any): any;
export declare function transNumber(value?: any): number;
export declare function transStrArr(value: string | undefined): string[] | undefined;
export declare function transNumberStrArr(value: string | undefined): string[] | undefined;
/**
 * 日期转换成unix
 * @param moment
 */
export declare function transStartDate(moment?: Moment): number | undefined;
export declare function transEndDate(moment?: Moment): number | undefined;
