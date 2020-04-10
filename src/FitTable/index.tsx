import React, { Key, useCallback, useMemo, useRef } from 'react';
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
import ColumnsSettingWrap from './ColumnsSettingWrap';
import { ColumnsSettingProps } from './ColumnsSetting';

export declare interface IFitTableProps<T>
    extends TableProps<T>,
        Partial<Pick<ColumnsSettingProps<T>, 'columnsSettingRender' | 'resetColumnsSetting'>> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
}

export const showTotal = (total: number) => {
    return <span>共有{total}条</span>;
};

export const goButton = <Button className={styles.btnGo}>Go</Button>;

function FitTable<T extends object = any>({
    bottom = 0,
    minHeight = 500,
    autoFitY = true,
    columns = [],
    rowSelection,
    scroll: propsScroll,
    onChange,
    pagination,
    ...props
}: IFitTableProps<T>) {
    const ref = useRef<HTMLDivElement>(null);
    const scroll = useScrollXY(
        ref,
        bottom,
        minHeight,
        autoFitY,
        columns,
        rowSelection,
        propsScroll,
    );

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

    return useMemo(() => {
        return (
            <div ref={ref}>
                <Table<T>
                    scroll={scroll}
                    columns={columns}
                    rowSelection={rowSelection}
                    {...props}
                    pagination={pagination}
                    onChange={onChange ? onPaginationChange : undefined}
                />
            </div>
        );
    }, [props, propsScroll, rowSelection, columns, pagination, onChange]);
}

function FitTableWrap<T extends object = any>({
    columnsSettingRender,
    ...props
}: IFitTableProps<T>) {
    return useMemo(() => {
        if (columnsSettingRender) {
            return <ColumnsSettingWrap {...props} columnsSettingRender={columnsSettingRender} />;
        } else {
            return <FitTable {...props} />;
        }
    }, [props]);
}

FitTableWrap.showTotal = showTotal;
FitTableWrap.goButton = goButton;
FitTableWrap.useScrollXY = useScrollXY;

export default FitTableWrap;

export { useScrollXY };
