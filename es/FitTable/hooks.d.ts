import { RefObject } from "react";
import { ProColumns } from "../ProTable";
import { SimpleRowSelection } from "../ProTable/Table";
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
declare function useScrollXY<T>(containerRef: RefObject<HTMLElement>, bottom: number, minHeight: number, autoFitY: boolean, columns: ProColumns<T>[], rowSelection: SimpleRowSelection<T> | undefined, scroll?: RcTableProps<T>['scroll'] & {
    scrollToFirstRowOnChange?: boolean;
}): {
    y: string | number;
    x: string | number;
    scrollToFirstRowOnChange: boolean;
};
export { useScrollXY };
