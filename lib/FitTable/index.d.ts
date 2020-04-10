/// <reference types="react" />
import { TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import { ColumnsSettingProps } from './ColumnsSetting';
export declare interface IFitTableProps<T> extends TableProps<T>, Partial<Pick<ColumnsSettingProps<T>, 'columnsSettingRender' | 'resetColumnsSetting'>> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
}
export declare const showTotal: (total: number) => JSX.Element;
export declare const goButton: JSX.Element;
declare function FitTableWrap<T extends object = any>({ columnsSettingRender, ...props }: IFitTableProps<T>): JSX.Element;
declare namespace FitTableWrap {
    var showTotal: (total: number) => JSX.Element;
    var goButton: JSX.Element;
    var useScrollXY: typeof import("./hooks").useScrollXY;
}
export default FitTableWrap;
export { useScrollXY };
