import { Formatters } from 'react-components';
import { endDateToUnix, startDateToUnix, startUtcDateToUnix, endUtcDateToUnix } from './date';
export declare const isNull: (value: any) => boolean;
export declare function transNullValue(value?: any): any;
export declare function transJoinStr(value?: any): any;
export declare function transNumber(value?: any): number;
export declare function transStrArr(value: string | undefined): string[] | undefined;
export declare function transNumberStrArr(value: string | undefined): string[] | undefined;
export declare function transNumberArray(value: string | undefined): number[] | undefined;
declare module 'react-components' {
    interface Formatters {
        number: typeof transNumber;
        str_arr: typeof transStrArr;
        join: typeof transJoinStr;
        number_str_arr: typeof transNumberStrArr;
        number_arr: typeof transNumberArray;
        null: typeof transNullValue;
        start_date: typeof startDateToUnix;
        end_date: typeof endDateToUnix;
        start_date_utc: typeof startUtcDateToUnix;
        end_date_utc: typeof endUtcDateToUnix;
    }
}
export declare type FormatterType = keyof Omit<Formatters, 'extend'> | ((value: any) => any);
declare const formatter: Formatters & {
    extend: (extend: Partial<Formatters>) => void;
};
export default formatter;
