import React from 'react';
import { ColumnType, TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import { ColumnGroupType, TablePaginationConfig } from 'antd/es/table/interface';
import { ColumnsSettingProps } from './ColumnsSetting';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
declare module 'antd/es/table/interface' {
    interface ColumnType<RecordType> {
        defaultHide?: boolean;
    }
}
declare module 'antd/lib/table/interface' {
    interface ColumnType<RecordType> {
        defaultHide?: boolean;
    }
}
export interface PaginationConfig extends PaginationProps {
    position?: TablePaginationConfig['position'];
}
export declare interface IFitTableProps<T> extends Omit<TableProps<T>, 'pagination'>, Partial<Pick<ColumnsSettingProps<T>, 'columnsSettingRender' | 'resetColumnsSetting'>> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    toolBarRender?: () => React.ReactNode[];
    pagination?: PaginationConfig | false | undefined;
    hideKeys?: string[];
    sortKeys?: string[];
    onHideKeysChange?: (hideKeys?: string[]) => void;
    onSortKeysChange?: (sortKeys?: string[]) => void;
}
export declare const showTotal: (total: number) => JSX.Element;
export declare const goButton: JSX.Element;
export declare const getColumnKey: (column: ColumnGroupType<any> | ColumnType<any>) => string;
declare function FitTableWrap<T extends object = any>({ columnsSettingRender, ...props }: IFitTableProps<T>): JSX.Element;
declare namespace FitTableWrap {
    var showTotal: (total: number) => JSX.Element;
    var goButton: JSX.Element;
    var useScrollXY: typeof import("./hooks").useScrollXY;
}
export default FitTableWrap;
export { useScrollXY };
