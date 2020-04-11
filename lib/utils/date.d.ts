import dayjs, { Dayjs } from 'dayjs';
export declare function unixToStartDate(unix: number): dayjs.Dayjs;
export declare function unixToEndDate(unix: number): dayjs.Dayjs;
export declare function startDateToUnix(moment?: Dayjs): number | undefined;
export declare function endDateToUnix(moment?: Dayjs): number | undefined;
export declare function utcToLocal(dateString?: string | number, placeholder?: string): string;
export declare function localToUtc(): void;
export declare function dateToUnix(date?: Dayjs | number): number;
