import React, { Key, useCallback, useEffect, useMemo, useRef } from 'react';
import { Table, Button, Pagination, Row, Col } from 'antd';
import { ColumnType, TableProps } from 'antd/lib/table';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import {
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
} from 'antd/es/table/interface';
import ColumnsSettingWrap from './ColumnsSettingWrap';
import { ColumnsSettingProps } from './ColumnsSetting';
import { EmptyObject } from '../utils';
import { defaultPageSizeOptions } from '../ProTable/config';
import formStyles from '../JsonForm/_form.less';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const RNDContext = createDndContext(HTML5Backend);

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
}

export const showTotal = (total: number) => {
    return <span>共有{total}条</span>;
};

export const goButton = <Button className={styles.btnGo}>Go</Button>;

const type = 'DragableBodyRow';

const DragableHeaderCell = ({ index, moveColumn, className, style, ...restProps }: any) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? styles.dropOverRight : styles.dropOverLeft,
            };
        },
        drop: item => {
            // @ts-ignore
            moveColumn(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <th
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
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
    onHeaderRow,
    // @ts-ignore
    settingComponent,
    ...props
}: IFitTableProps<T>) {
    const ref = useRef<HTMLDivElement>(null);
    const manager = useRef(RNDContext);

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
    const moveColumn = useCallback((dragIndex, hoverIndex) => {}, []);

    // columns转换

    const tableContent = useMemo(() => {
        const _columns = columns.map((column, index) => {
            return {
                ...column,
                onHeaderCell: () => ({
                    index: index,
                    moveColumn,
                }),
            };
        });
        return (
            <DndProvider manager={manager.current.dragDropManager}>
                <Table<T>
                    key={columns.length}
                    scroll={scroll}
                    // @ts-ignore
                    columns={_columns}
                    rowSelection={rowSelection}
                    {...props}
                    pagination={false}
                    onChange={onChange ? onTableChange : undefined}
                    onHeaderRow={onHeaderRowFn}
                    components={{
                        header: {
                            cell: DragableHeaderCell,
                        },
                    }}
                />
            </DndProvider>
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
