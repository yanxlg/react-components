import React, { Key, useCallback, useMemo, useRef } from 'react';
import { Table, Button, Pagination, Row, Col } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import { PaginationConfig } from 'antd/es/pagination';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import ColumnsSettingWrap from './ColumnsSettingWrap';
import { ColumnsSettingProps } from './ColumnsSetting';
import { EmptyArray, EmptyObject } from '../utils';
import { defaultPageSizeOptions } from '../ProTable/config';
import formStyles from '../JsonForm/_form.less';

export declare interface IFitTableProps<T>
    extends TableProps<T>,
        Partial<Pick<ColumnsSettingProps<T>, 'columnsSettingRender' | 'resetColumnsSetting'>> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    toolBarRender?: () => React.ReactNode[];
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
    toolBarRender = () => null,
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

    const filtersRef = useRef<Record<string, Key[] | null>>(EmptyObject);
    const sorterRef = useRef<SorterResult<T> | SorterResult<T>[]>(EmptyObject);
    const extraRef = useRef<TableCurrentDataSource<T>>({ currentDataSource: EmptyArray });

    const onTableChange = useCallback(
        (
            page: PaginationConfig,
            filters: Record<string, Key[] | null>,
            sorter: SorterResult<T> | SorterResult<T>[],
            extra: TableCurrentDataSource<T>,
        ) => {
            filtersRef.current = filters;
            sorterRef.current = sorter;
            extraRef.current = extra;
            if (onChange) {
                onChange(pagination || {}, filters, sorter, extra);
            }
        },
        [pagination],
    );

    const onPageChange = useCallback((page: number, pageSize: number) => {
        if (onChange) {
            onChange(
                { ...pagination, current: page, pageSize: pageSize },
                filtersRef.current,
                sorterRef.current,
                extraRef.current,
            );
        }
    }, []);

    const paginationComponent = useMemo(() => {
        return pagination ? (
            <Pagination
                {...{
                    pageSizeOptions: defaultPageSizeOptions,
                    showQuickJumper: {
                        goButton: goButton,
                    },
                    showTotal: showTotal,
                    ...pagination,
                }}
                onChange={onPageChange}
                onShowSizeChange={onPageChange}
            />
        ) : null;
    }, [pagination]);

    const tableContent = useMemo(() => {
        return (
            <Table<T>
                scroll={scroll}
                columns={columns}
                rowSelection={rowSelection}
                {...props}
                pagination={false}
                onChange={onChange ? onTableChange : undefined}
            />
        );
    }, [props, propsScroll, rowSelection, columns, onChange]);

    const paginationTopContainer = useMemo(() => {
        const top = pagination && pagination.position && pagination.position.includes('topRight'); // 需要有top配置，默认不显示
        return top ? (
            <Row className={formStyles.formItem}>
                <Col flex={1}>{toolBarRender()}</Col>
                <Col>{paginationComponent}</Col>
            </Row>
        ) : null;
    }, [pagination, toolBarRender]);

    const paginationBottomContainer = useMemo(() => {
        const bottom = pagination
            ? pagination.position === void 0 || pagination.position.includes('bottomRight')
            : false;
        return bottom ? (
            <Row className={formStyles.formItem}>
                <Col flex={1} />
                <Col>{paginationComponent}</Col>
            </Row>
        ) : null;
    }, [pagination]);

    return useMemo(() => {
        return (
            <div ref={ref}>
                {paginationTopContainer}
                {tableContent}
                {paginationBottomContainer}
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
