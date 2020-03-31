import React, { useMemo, useRef } from 'react';
import { Table, Button } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import styles from './_index.less';

declare interface IFitTableProps<T> extends TableProps<T> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
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

    return useMemo(() => {
        return (
            <div ref={ref}>
                <Table<T>
                    scroll={scroll}
                    columns={columns}
                    rowSelection={rowSelection}
                    {...props}
                />
            </div>
        );
    }, [props, propsScroll, rowSelection, columns]);
}

export default FitTable;

export {useScrollXY};
