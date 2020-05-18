import React, { Key, useCallback, useEffect, useMemo, useRef } from 'react';
import { Table, Button, Pagination, Row, Col } from 'antd';
import { ColumnType, TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import ColumnsSettingWrap from './ColumnsSettingWrap';
import { ColumnsSettingProps } from './ColumnsSetting';
import { EmptyArray, EmptyObject } from '../utils';
import { defaultPageSizeOptions } from '../ProTable/config';
import formStyles from '../JsonForm/_form.less';
import { PaginationPosition, PaginationProps } from 'antd/lib/pagination/Pagination';

declare module 'antd/es/table/interface' {
    interface ColumnType<RecordType> {
        defaultHide?: boolean;
        hideInSetting?: boolean;
    }
}

declare module 'antd/lib/table/interface' {
    interface ColumnType<RecordType> {
        defaultHide?: boolean;
        hideInSetting?: boolean;
    }
}

export interface PaginationConfig extends PaginationProps {
    position?: PaginationPosition[] | PaginationPosition;
}

export declare interface IFitTableProps<T>
    extends Omit<TableProps<T>, 'pagination'>,
        Partial<Pick<ColumnsSettingProps<T>, 'columnsSettingRender' | 'resetColumnsSetting'>> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    toolBarRender?: () => React.ReactNode[];
    pagination?: PaginationConfig;
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
    onHeaderRow,
    // @ts-ignore
    settingComponent,
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
                onChange(pagination || (({} as unknown) as any), filters, sorter, extra);
            }
        },
        [pagination],
    );

    const onPageChange = useCallback((page: number, pageSize: number) => {
        if (onChange) {
            onChange(
                { ...((pagination as unknown) as any), current: page, pageSize: pageSize },
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

    const onHeaderRowEnter = useCallback(event => {
        ref.current.setAttribute('data-show-setting', 'true');
    }, []);
    const onHeaderRowLeave = useCallback(event => {
        ref.current.removeAttribute('data-show-setting');
    }, []);

    useEffect(() => {
        return () => {
            ref.current.removeAttribute('data-show-setting');
        };
    }, []);

    const onHeaderRowFn = useCallback(
        (column: ColumnType<T>[], index: number) => {
            if (onHeaderRow) {
                const { onMouseEnter, onMouseLeave, ...extra } = onHeaderRow(column, index);
                return {
                    ...extra,
                    onMouseEnter: (event: any) => {
                        onHeaderRowEnter(event);
                        onMouseEnter && onMouseEnter(event);
                    },
                    onMouseLeave: (event: any) => {
                        onHeaderRowLeave(event);
                        onMouseLeave && onMouseLeave(event);
                    },
                };
            } else {
                return {
                    onMouseEnter: onHeaderRowEnter,
                    onMouseLeave: onHeaderRowLeave,
                };
            }
        },
        [onHeaderRow],
    );

    const tableContent = useMemo(() => {
        return (
            <Table<T>
                key={columns.length}
                scroll={scroll}
                columns={columns}
                rowSelection={rowSelection}
                {...props}
                pagination={false}
                onChange={onChange ? onTableChange : undefined}
                onHeaderRow={onHeaderRowFn}
            />
        );
    }, [props, propsScroll, rowSelection, columns, onChange]);

    const paginationTopContainer = useMemo(() => {
        const top = pagination && pagination.position && pagination.position.includes('topRight'); // 需要有top配置，默认不显示
        return top ? (
            <Row>
                <Col className={styles.toolSpacing} flex={1}>
                    {toolBarRender()}
                </Col>
                <Col className={styles.toolSpacing}>{paginationComponent}</Col>
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
            <div>
                {paginationTopContainer}
                <div ref={ref} className={styles.relative}>
                    {settingComponent}
                    {tableContent}
                </div>
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
