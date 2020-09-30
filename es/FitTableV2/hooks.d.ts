import { RefObject } from 'react';
import { ProColumns } from '../_Deprecated/ProTable';
import { SimpleRowSelection } from '../_Deprecated/ProTable/Table';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import { ColumnsType } from 'antd/lib/table/interface';
declare function useScrollXY<T>(containerRef: RefObject<HTMLElement>, bottom: number, minHeight: number, autoFitY: boolean, columns: ProColumns<T>[] | ColumnsType<T>, rowSelection: SimpleRowSelection<T> | undefined, scroll?: RcTableProps<T>['scroll'] & {
    scrollToFirstRowOnChange?: boolean;
}): {
    y: import("react").ReactText;
    x: import("react").ReactText;
    scrollToFirstRowOnChange: boolean;
};
export { useScrollXY };
