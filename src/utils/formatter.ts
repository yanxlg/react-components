// 核心思想：以addOn形式支持外部提供内部逻辑
import { Formatters } from 'react-components';
import { endDateToUnix, startDateToUnix } from './date';
import addOn from './addOn';

export const isNull = function(value: any) {
    return value === null || value === void 0;
};

export function transNullValue(value?: any) {
    return value === '' || isNull(value) ? undefined : value;
}

export function transJoinStr(value?: any) {
    return value && value.length ? value.join(',') : undefined;
}

export function transNumber(value?: any) {
    const _value =
        typeof value === 'string'
            ? value === ''
                ? undefined
                : Number(value)
            : typeof value === 'number'
            ? value
            : undefined;
    return _value && isNaN(_value) ? undefined : _value;
}

export function transStrArr(value: string | undefined): string[] | undefined {
    if (typeof value === 'string') {
        return value
            .trim()
            .split(',')
            .filter(str => str);
    }
    return value as undefined;
}

export function transNumberStrArr(value: string | undefined): string[] | undefined {
    if (typeof value === 'string') {
        return value
            .trim()
            .split(',')
            .filter(str => str && !/[^0-9\,]/g.test(str));
    }
    return value as undefined;
}

export function transNumberArray(value: string | undefined): number[] | undefined {
    if (typeof value === 'string') {
        return transNumberStrArr(value).map(item => transNumber(item));
    }
    return value as undefined;
}

// 覆盖初始接口定义，如果外部使用extend扩展，需要添加定义，否则ts检查会报错
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
    }
}

export type FormatterType = keyof Omit<Formatters, 'extend'> | ((value: any) => any);

const formatter = addOn<Formatters>({
    number: transNumber,
    str_arr: transStrArr,
    join: transJoinStr,
    null: transNullValue,
    number_arr: transNumberArray,
    number_str_arr: transNumberStrArr,
    start_date: startDateToUnix,
    end_date: endDateToUnix,
});

export default formatter;
