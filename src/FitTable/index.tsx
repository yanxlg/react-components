import React, { Key, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Table, Button } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import { PaginationConfig } from 'antd/es/pagination';
import {
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
} from 'antd/es/table/interface';
import { ColumnType } from 'antd/lib/table/interface';
import ColumnsSetting from './ColumnsSetting';

declare interface IFitTableProps<T> extends TableProps<T> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    showColumnsSetting?: boolean;
}

export const showTotal = (total: number) => {
    return <span>共有{total}条</span>;
};

export const goButton = <Button className={styles.btnGo}>Go</Button>;

function FitTable<T extends object>({
    bottom = 0,
    minHeight = 500,
    autoFitY = true,
    columns = [],
    rowSelection,
    scroll: propsScroll,
    onChange,
    pagination,
    showColumnsSetting = false,
    ...props
}: IFitTableProps<T>) {
    const ref = useRef<HTMLDivElement>(null);

    const [filterColumns, setFilterColumns] = useState<Array<ColumnType<T>>>(columns);

    const scroll = useScrollXY(
        ref,
        bottom,
        minHeight,
        autoFitY,
        showColumnsSetting ? filterColumns : columns,
        rowSelection,
        propsScroll,
    );

    useEffect(() => {
        setFilterColumns(columns);
    }, [columns]);

    const onPaginationChange = useCallback(
        (
            page: PaginationConfig,
            filters: Record<string, Key[] | null>,
            sorter: SorterResult<T> | SorterResult<T>[],
            extra: TableCurrentDataSource<T>,
        ) => {
            if (!pagination) {
                onChange && onChange(page, filters, sorter, extra);
                return;
            }

            const { total, current, pageSize } = pagination as TablePaginationConfig;
            if (page.pageSize !== pageSize) {
                // pageSize发生变化，保留原油current
                // 计算如果不能够满足当前的pageNumber则重置为1
                const maxPageNumber = Math.ceil(Number(total) / page.pageSize);
                const pageNumber = current <= maxPageNumber ? current : 1;
                onChange && onChange({ ...page, current: pageNumber }, filters, sorter, extra);
            } else {
                onChange && onChange(page, filters, sorter, extra);
            }
        },
        [pagination],
    );

    const onFilterColumns = useCallback((columns: Array<ColumnType<T>>) => {
        setFilterColumns(columns);
    }, []);

    const _columns = showColumnsSetting ? filterColumns : columns;

    const setting = useMemo(() => {
        return <ColumnsSetting columns={columns} filterColumns={onFilterColumns} />;
    }, [_columns]);

    return useMemo(() => {
        return (
            <div ref={ref} className={styles.relative}>
                {setting}
                <Table<T>
                    scroll={scroll}
                    columns={_columns}
                    rowSelection={rowSelection}
                    {...props}
                    pagination={pagination}
                    onChange={onChange ? onPaginationChange : undefined}
                />
            </div>
        );
    }, [props, propsScroll, rowSelection, _columns, pagination, onChange]);
}

FitTable.showTotal = showTotal;
FitTable.goButton = goButton;
FitTable.useScrollXY = useScrollXY;

export default FitTable;

export { useScrollXY };
