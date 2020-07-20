import React, { Key, useCallback, useEffect, useMemo, useRef } from 'react';
import { Table, Button, Pagination, Row, Col } from 'antd';
import { ColumnType, TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import {
    ColumnGroupType,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
} from 'antd/es/table/interface';
import ColumnsSettingWrap from './ColumnsSettingWrap';
import { ColumnsSettingProps } from './ColumnsSetting';
import { EmptyObject } from '../utils';
import { defaultPageSizeOptions } from '../_Deprecated/ProTable/config';
import formStyles from '../JsonForm/_form.less';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import DraggableHeaderCell from './DraggableHeaderCell';
import { FixedType } from 'rc-table/lib/interface';
import DragDropProvider from './DragDropProvider';
import assert from 'assert';

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

export declare interface IFitTableProps<T>
    extends Omit<TableProps<T>, 'pagination'>,
        Partial<Pick<ColumnsSettingProps<T>, 'columnsSettingRender' | 'resetColumnsSetting'>> {
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    toolBarRender?: () => React.ReactNode[];
    pagination?: PaginationConfig | false | undefined;
    hideKeys?: string[];
    sortKeys?: string[]; // 排序
    onHideKeysChange?: (hideKeys?: string[]) => void;
    onSortKeysChange?: (sortKeys?: string[]) => void;
}

export const showTotal = (total: number) => {
    return <span>共有{total}条</span>;
};

export const goButton = <Button className={styles.btnGo}>Go</Button>;

// 针对columns进行检查，如果dataIndex不是字符串则需要唯一key

export const getColumnKey = (column: ColumnGroupType<any> | ColumnType<any>) => {
    return String(column.key || column['dataIndex']);
};

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
    hideKeys,
    sortKeys,
    onHeaderRow,
    // @ts-ignore
    settingComponent,
    onSortKeysChange,
    ...props
}: IFitTableProps<T>) {
    // columns => sort => filter
    if (process.env.NODE_ENV === 'development') {
        columns.forEach(item => {
            const dataIndex = typeof item['dataIndex'] === 'string';
            const key = item.key;
            assert(key || dataIndex, 'column must have a unique key or dataIndex(String).');
        });
    }

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
    const extraRef = useRef<TableCurrentDataSource<T>>();

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

    const moveColumn = useCallback(
        (from, to) => {
            if (from !== to) {
                let keys = sortKeys || columns.map(item => getColumnKey(item));
                if (to > from) {
                    keys.splice(to + 1, 0, keys[from]);
                    keys.splice(from, 1);
                } else {
                    keys.splice(to, 0, keys[from]);
                    keys.splice(from + 1, 1);
                }
                onSortKeysChange?.(Array.from(keys));
            }
        },
        [columns, sortKeys],
    );

    const sortMap = useMemo(() => {
        let map: { [key: string]: number } = {};
        if (sortKeys) {
            sortKeys.forEach((key, index) => {
                map[String(key)] = index;
            });
        } else {
            columns.forEach((item, index) => {
                map[getColumnKey(item)] = index;
            });
        }
        return map;
    }, [sortKeys, columns]);

    // columns转换 columns => sort => filter
    const mergeColumns = useMemo(() => {
        let alignsArray: FixedType[] = [];

        const filterColumns = columns
            .sort((a, b) => {
                const preSortIndex = sortMap[getColumnKey(a)] || 0;
                const nextSortIndex = sortMap[getColumnKey(b)] || 0;
                return preSortIndex - nextSortIndex;
            })
            .map((column, index) => {
                return {
                    ...column,
                    onHeaderCell: () =>
                        ({
                            index: index,
                            moveColumn,
                        } as any),
                };
            })
            .filter(item => {
                const filtered = !hideKeys || hideKeys.indexOf(getColumnKey(item)) === -1;
                if (filtered) {
                    alignsArray.push(item.fixed);
                }
                return filtered;
            });
        const alignsString = alignsArray.join(',');
        const left = alignsString.match(/^left(,left)*/);
        const right = alignsString.match(/right(,right)*$/);
        const leftAlignSize = left ? left[0].split(',').length : 0;
        const rightAlignSize = right ? right[0].split(',').length : 0;
        const length = filterColumns.length;
        // 获取left最长位，获取right最长位
        return filterColumns.map((item, index) => {
            if (index + 1 <= leftAlignSize || index >= length - rightAlignSize) {
                return item;
            } else {
                return {
                    ...item,
                    fixed: undefined,
                };
            }
        });
        // fixed处理不可断层
    }, [columns, hideKeys, sortKeys]);

    const tableContent = useMemo(() => {
        return (
            <DragDropProvider>
                <Table<T>
                    scroll={scroll}
                    columns={mergeColumns}
                    rowSelection={rowSelection}
                    {...props}
                    pagination={false}
                    onChange={onChange ? onTableChange : undefined}
                    onHeaderRow={onHeaderRowFn}
                    components={{
                        header: {
                            cell: DraggableHeaderCell, // TODO 如果外部重新定义cell怎么处理
                        },
                    }}
                />
            </DragDropProvider>
        );
    }, [props, propsScroll, rowSelection, columns, onChange, hideKeys, sortKeys]);

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
    }, [props, propsScroll, rowSelection, columns, pagination, onChange, hideKeys, sortKeys]);
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
