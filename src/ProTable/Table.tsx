import './index.less';

import React, { useEffect, CSSProperties, useRef, useState, useCallback, useMemo } from 'react';
import { ConfigProvider, Card, Typography, Empty, Tooltip } from 'antd';
import classNames from 'classnames';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';

import Toolbar, { OptionConfig, ToolBarProps, ToolBarRef } from './component/toolBar';

import { RenderedCell } from 'rc-table/lib/interface';
import { TableRowSelection } from 'antd/es/table/interface';

import { checkUndefinedOrNull, genColumnKey, useDeepCompareEffect } from './component/util';

import { DensitySize } from './component/toolBar/DensityIcon';
import { useRowSelection } from './hooks';
import TableAlert, { TableAlertRef } from './component/alert';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { TableProps } from 'antd/lib/table';
import FitTable, { goButton, showTotal } from '../FitTable';
import { defaultPageSizeOptions } from './config';

export interface ColumnsState {
    show?: boolean;
    fixed?: 'right' | 'left' | undefined;
}

export interface ProColumnType<T = unknown> extends Omit<ColumnType<T>, 'render'> {
    /**
     * 扩展render,用于支持内部优化及封装
     */
    render?: (
        value: any,
        record: T,
        index: number,
        dom: React.ReactNode,
    ) => React.ReactNode | RenderedCell<T>;
    /**
     * 是否缩略
     */
    ellipsis?: boolean;
    /**
     * 是否拷贝
     */
    copyable?: boolean;
}

export interface ProColumnGroupType<RecordType> extends ProColumnType<RecordType> {
    children: ProColumns<RecordType>;
}

export type ProColumns<T> = ProColumnGroupType<T> | ProColumnType<T>;

export type SimpleRowSelection<T> = Omit<
    TableRowSelection<T>,
    | 'type'
    | 'getCheckboxProps'
    | 'onSelect'
    | 'onSelectMultiple'
    | 'onSelectAll'
    | 'onSelectInvert'
    | 'selections'
    | 'hideDefaultSelections'
    | 'columnTitle'
>;

export interface ProTableProps<T, U extends { [key: string]: any }>
    extends Omit<TableProps<T>, 'columns' | 'rowSelection'> {
    columns?: ProColumns<T>[];

    onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;

    onSizeChange?: (size: DensitySize) => void;

    /**
     * 渲染操作栏
     */
    toolBarRender?: ToolBarProps['toolBarRender'] | false;

    /**
     * 给封装的 table 的 className
     */
    tableClassName?: string;

    /**
     * 给封装的 table 的 style
     */
    tableStyle?: CSSProperties;

    /**
     * 左上角的 title
     */
    headerTitle?: React.ReactNode;

    /**
     * 默认的操作栏配置
     */
    options?:
        | (Omit<OptionConfig, 'density'> & {
              density: boolean;
          })
        | false;

    /**
     * 自定义 table 的 alert
     * 设置或者返回false 即可关闭
     */
    tableAlertRender?: ((keys: (string | number)[]) => React.ReactNode) | false;
    /**
     * 自定义 table 的 alert 的操作
     * 设置或者返回false 即可关闭
     */
    tableAlertOptionRender?:
        | ((props: { onCleanSelected?: () => void }) => React.ReactNode)
        | false;

    rowSelection?: SimpleRowSelection<T>;

    style?: React.CSSProperties;

    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    optimize?: boolean;
}

interface ColumRenderInterface<T> {
    item: ProColumns<T>;
    text: any;
    row: T;
    index: number;
}

/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */
const genEllipsis = (dom: React.ReactNode, item: ProColumns<any>, text: string) => {
    if (!item.ellipsis) {
        return dom;
    }
    return (
        <Tooltip title={text}>
            <div>{dom}</div>
        </Tooltip>
    );
};

const genCopyable = (dom: React.ReactNode, item: ProColumns<any>) => {
    if (item.copyable || item.ellipsis) {
        return (
            <Typography.Paragraph
                style={{
                    width: item.width && (item.width as number) - 32,
                    margin: 0,
                    padding: 0,
                }}
                copyable={item.copyable}
                ellipsis={item.ellipsis}
            >
                {dom}
            </Typography.Paragraph>
        );
    }
    return dom;
};

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
const columRender = <T, U = any>({ item, text, row, index }: ColumRenderInterface<T>): any => {
    const dom: React.ReactNode = genEllipsis(genCopyable(text, item), item, text);
    if (item.render) {
        const renderDom = item.render(text, row, index, dom);
        return renderDom as React.ReactNode;
    }
    return checkUndefinedOrNull(dom) ? dom : null;
};

/**
 * TODO 支持外部管控整个stateMap状态
 * @param columns
 * @param map
 */
const genColumnList = <T, U = {}>(
    columns: ProColumns<T>[],
    map: {
        [key: string]: ColumnsState;
    },
): (ColumnsType<T>[number] & { index?: number })[] => {
    return columns.map((item, columnsIndex) => {
        const { key, dataIndex } = item;
        const columnKey = genColumnKey(key, dataIndex);
        const config = columnKey ? map[columnKey] || { fixed: item.fixed } : { fixed: item.fixed };
        const tempColumns = {
            ...item,
            ellipsis: false,
            fixed: config.fixed,
            width: item.width || (item.fixed ? 200 : undefined),
            // @ts-ignore
            children: item.children ? genColumnList(item.children, map) : undefined,
            render: (text: any, row: T, index: number) =>
                columRender<T>({ item, text, row, index }),
        };
        if (!tempColumns.children || !tempColumns.children.length) {
            delete tempColumns.children;
        }
        if (!tempColumns.dataIndex) {
            delete tempColumns.dataIndex;
        }
        if (!tempColumns.filters || !tempColumns.filters.length) {
            delete tempColumns.filters;
        }
        return tempColumns;
    });
};

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const ProTable = <T extends {}, U extends object>(
    props: ProTableProps<T, U> & {
        defaultClassName: string;
    },
) => {
    const {
        className: propsClassName,
        headerTitle,
        pagination,
        columns: proColumns = [],
        toolBarRender = () => [],
        style,
        tableStyle,
        tableClassName,
        onColumnsStateChange,
        options: proOptions,
        rowSelection: propsRowSelection = {},
        tableAlertRender = false,
        defaultClassName,
        size: proSize,
        loading,
        dataSource = [],
        onSizeChange,
        scroll: propsScroll,
        bottom = 0,
        minHeight = 500,
        autoFitY = true,
        optimize = true,
        rowKey = '',
        ...rest
    } = props;
    const { selectedRowKeys, onChange } = propsRowSelection;
    const rootRef = useRef<HTMLDivElement>(null);
    const [sortKeyColumns, setSortKeyColumns] = useState<(string | number)[]>([]);

    const [columnsMap, setColumnsMap] = useState<{
        [key: string]: ColumnsState;
    }>({});

    const [tableColumns, setTableColumns] = useState<ProColumns<T>[]>(proColumns);

    const [tableSize, setTableSize] = useState<SizeType>(proSize || 'large');

    /***********************密度设置**************************/
    const size = proSize === void 0 ? tableSize : proSize;

    const updateTableSize = useCallback(tableSize => {
        if (proSize === void 0) {
            setTableSize(tableSize);
        } else {
            onSizeChange && onSizeChange(tableSize);
        }
    }, []);

    /**
     * Table Column 变化的时候更新一下，这个参数将会用于渲染
     */
    useDeepCompareEffect(() => {
        const tableColumn = genColumnList<T>(proColumns, columnsMap);
        if (tableColumn && tableColumn.length > 0) {
            setTableColumns(tableColumn);
            // 重新生成key的字符串用于排序
            setSortKeyColumns(
                tableColumn.map((item, index) => {
                    const key =
                        genColumnKey(item.key, (item as ProColumnType).dataIndex) || `${index}`;
                    return `${key}_${item.index}`;
                }),
            );
        }
    }, [proColumns]);

    /**
     * 这里主要是为了排序，为了保证更新及时，每次都重新计算
     */
    useDeepCompareEffect(() => {
        const keys = sortKeyColumns.join(',');
        let tableColumn = genColumnList<T>(proColumns, columnsMap);
        if (keys.length > 0) {
            // 用于可视化的排序
            tableColumn = tableColumn.sort((a, b) => {
                // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
                const aKey = `${genColumnKey(a.key, (a as ProColumnType).dataIndex) || a.index}_${
                    a.index
                }`;
                const bKey = `${genColumnKey(b.key, (b as ProColumnType).dataIndex) || b.index}_${
                    b.index
                }`;
                return keys.indexOf(aKey) - keys.indexOf(bKey);
            });
        }
        tableColumn.sort((a: ProColumns<T>, b: ProColumns<T>) => {
            // if (a.fixed === 'left' && b.fixed === 'left') return -1;
            if (a.fixed === 'left' && b.fixed !== 'left') return -1;
            if (a.fixed !== 'left' && b.fixed === 'left') return 1;
            if (a.fixed === 'right' && b.fixed !== 'right') {
                return 1;
            }
            if (a.fixed !== 'right' && b.fixed === 'right') {
                return -1;
            }
            return 0;
        });
        if (tableColumn && tableColumn.length > 0) {
            setTableColumns(tableColumn);
        }
    }, [columnsMap, sortKeyColumns.join('-')]);

    /**
     * columns 过滤筛选  待优化
     */
    const onSelectedRowKeysUpdate = useCallback((selectedRowKeys: (string | number)[]) => {
        toolbarRef.current?.updateSelectedState(selectedRowKeys);
        alertRef.current?.updateSelectedState(selectedRowKeys);
    }, []);

    const { columns, rowSelection, clearCheckedRows } = useRowSelection(
        tableColumns,
        rowKey,
        dataSource,
        propsRowSelection,
        optimize,
        onSelectedRowKeysUpdate,
    );

    const filterColumns = useMemo(()=>{
        return columns.filter(item => {
            const { key, dataIndex } = item;
            const columnKey = genColumnKey(key, dataIndex);
            if (!columnKey) {
                return true;
            }
            const config = columnsMap[columnKey];
            if (config && config.show === false) {
                return false;
            }
            return true;
        })
    },[columns,columnsMap]);

    /**
     * 需要清除选中状态时
     */
    useEffect(() => {
        onCleanSelected();
    }, [dataSource]); //  数据发生改变需要清除selectedRowKeys

    const fullScreenFn = () => {
        if (proOptions) {
            if (proOptions.fullScreen && typeof proOptions.fullScreen === 'function') {
                proOptions.fullScreen();
                return;
            }
        }
        if (!rootRef.current || !document.fullscreenEnabled) {
            return;
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            rootRef.current.requestFullscreen();
        }
    };

    const className = classNames(defaultClassName, propsClassName);

    /************************toolbar 处理***********************/
    const toolbarRef = useRef<ToolBarRef>(null); // 优化模式用于动态修改selectedRowKeys

    /************************options 处理***********************/
    const options = useMemo(() => {
        if (!proOptions) {
            return proOptions;
        }
        const { density, fullScreen } = proOptions;
        return {
            ...proOptions,
            ...(density
                ? {
                      density: {
                          tableSize: size,
                          setTableSize: updateTableSize,
                      },
                  }
                : {}),
            ...(fullScreen
                ? {
                      fullScreen: fullScreenFn,
                  }
                : {}),
        };
    }, [proOptions, size]);

    const toolbar = useMemo(() => {
        if (optimize) {
            return toolBarRender === false ? null : (
                <Toolbar
                    columns={tableColumns}
                    sortKeyColumns={sortKeyColumns}
                    setSortKeyColumns={setSortKeyColumns}
                    setColumnsMap={setColumnsMap}
                    columnsMap={columnsMap}
                    toolbarRef={toolbarRef}
                    options={options as OptionConfig | false}
                    headerTitle={headerTitle}
                    toolBarRender={toolBarRender}
                />
            );
        } else {
            return toolBarRender === false ? null : (
                <Toolbar
                    columns={tableColumns}
                    sortKeyColumns={sortKeyColumns}
                    setSortKeyColumns={setSortKeyColumns}
                    setColumnsMap={setColumnsMap}
                    columnsMap={columnsMap}
                    selectedRowKeys={selectedRowKeys}
                    toolbarRef={toolbarRef}
                    options={options as OptionConfig | false}
                    headerTitle={headerTitle}
                    toolBarRender={toolBarRender}
                />
            );
        }
    }, [size, optimize ? undefined : selectedRowKeys, tableColumns, options, toolBarRender]);

    /************************alert 处理***********************/
    const alertRef = useRef<TableAlertRef>(null); // 优化模式用于动态修改selectedRowKeys
    const alert = useMemo(() => {
        if (propsRowSelection === false) {
            return null;
        }
        if (optimize) {
            return (
                <TableAlert
                    ref={alertRef}
                    onCleanSelected={onCleanSelected}
                    alertOptionRender={rest.tableAlertOptionRender}
                    alertInfoRender={tableAlertRender}
                />
            );
        } else {
            return (
                <TableAlert
                    selectedRowKeys={selectedRowKeys}
                    onCleanSelected={onCleanSelected}
                    alertOptionRender={rest.tableAlertOptionRender}
                    alertInfoRender={tableAlertRender}
                />
            );
        }
    }, [optimize ? undefined : selectedRowKeys]);

    const onCleanSelected = useCallback(() => {
        if (!optimize) {
            onChange && onChange([], []);
        } else {
            clearCheckedRows && clearCheckedRows();
            // 触发组件更新
            onSelectedRowKeysUpdate([]);
        }
    }, []);

    const table = useMemo(() => {
        return (
            <FitTable<T>
                {...rest}
                scroll={propsScroll}
                size={size}
                rowSelection={propsRowSelection === undefined ? undefined : rowSelection}
                className={tableClassName}
                style={tableStyle}
                columns={filterColumns as any}
                loading={loading}
                dataSource={dataSource}
                rowKey={rowKey}
                pagination={{
                    pageSizeOptions: defaultPageSizeOptions,
                    showQuickJumper: {
                        goButton: goButton,
                    },
                    showTotal: showTotal,
                    ...pagination,
                }}
            />
        );
    }, [columns, pagination, size, propsRowSelection, loading]);

    if (proColumns.length < 1) {
        return <Empty />;
    }

    return (
        <ConfigProvider
            getPopupContainer={() => ((rootRef.current || document.body) as any) as HTMLElement}
        >
            <div className={className} id="ant-design-pro-table" style={style} ref={rootRef}>
                <Card
                    bordered={true}
                    style={{
                        height: '100%',
                    }}
                    bodyStyle={{
                        padding: 0,
                    }}
                >
                    {toolbar}
                    {alert}
                    {table}
                </Card>
            </div>
        </ConfigProvider>
    );
};

/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
const ProviderWarp = <T, U extends { [key: string]: any } = {}>(props: ProTableProps<T, U>) => (
    <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => (
            <ProTable defaultClassName={getPrefixCls('pro-table')} {...props} />
        )}
    </ConfigConsumer>
);

export default ProviderWarp;
