import { ColumnType } from "antd/es/table";
import React from "react";
export declare type FilterColumns<T> = Omit<ColumnType<T>, "render"> & {
    filterType?: "input";
    render?: (
        text: React.ReactNode,
        record: T,
        index: number,
        filterText?: string,
        dom?: React.ReactNode,
    ) => React.ReactNode | React.ReactNode[];
};
declare function useFilterColumns<T>(columns: FilterColumns<T>[]): ColumnType<T>[];
export default useFilterColumns;
