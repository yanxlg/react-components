import dayjs, { Dayjs } from 'dayjs';
import { isNumber } from './index';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export function unixToStartDate(unix: number) {
    return !unix ? undefined : dayjs.unix(unix);
}

export function unixToEndDate(unix: number) {
    return !unix ? undefined : dayjs.unix(unix).add(-1, 'd');
}

export function startDateToUnix(moment?: Dayjs): number | undefined {
    return moment
        ? moment
              .clone()
              .hour(0)
              .minute(0)
              .second(0)
              .unix()
        : undefined;
}

export function endDateToUnix(moment?: Dayjs): number | undefined {
    return moment
        ? moment
              .clone()
              .add(1, 'd')
              .hour(0)
              .minute(0)
              .second(0)
              .unix()
        : undefined;
}

export function utcToLocal(dateString?: string | number, placeholder: string = '--') {
    const dateValue = isNumber(dateString) ? (dateString as number) * 1000 : dateString;
    return dateValue
        ? dayjs
              .utc(dateValue)
              .local()
              .format(dateFormat)
        : placeholder;
}

export function localToUtc() {}

export function dateToUnix(date?: Dayjs | number) {
    return typeof date === 'number' ? date : (date?.unix() as number);
}

// 时间选择框当UTC时间
export function startUtcDateToUnix(moment?: Dayjs): number | undefined {
    return moment
        ? moment
              .clone()
              .hour(0)
              .minute(0)
              .second(0)
              .add(8, 'h')
              .unix()
        : undefined;
}

// 时间选择框当UTC时间
export function endUtcDateToUnix(moment?: Dayjs): number | undefined {
    return moment
        ? moment
              .clone()
              .add(1, 'd')
              .hour(0)
              .minute(0)
              .second(0)
              .add(8, 'h')
              .unix()
        : undefined;
}
