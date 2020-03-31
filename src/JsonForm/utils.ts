import { Moment } from 'moment';

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
            .replace(/(^\s*)|(\s*$)/g, '')
            .split(',')
            .filter(str => str);
    }
    return value as undefined;
}

export function transNumberStrArr(value: string | undefined): string[] | undefined {
    if (typeof value === 'string') {
        return value
            .replace(/(^\s*)|(\s*$)/g, '')
            .split(',')
            .filter(str => str && !/[^0-9\,]/g.test(str));
    }
    return value as undefined;
}

/**
 * 日期转换成unix
 * @param moment
 */
export function transStartDate(moment?: Moment) {
    return moment
        ? moment
              .clone()
              .hour(0)
              .minute(0)
              .second(0)
              .unix()
        : moment;
}

export function transEndDate(moment?: Moment) {
    return moment
        ? moment
              .clone()
              .add(1, 'd')
              .hour(0)
              .minute(0)
              .second(0)
              .unix()
        : moment;
}
