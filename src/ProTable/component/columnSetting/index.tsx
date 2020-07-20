import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import { PushpinOutlined, SettingOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { Checkbox, Popover, Tooltip } from 'antd';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { ProColumns, ColumnsState } from '../../Table';
import DnDItem from './DndItem';
import './index.less';
import { genColumnKey } from '../util';

export interface ColumnSettingProps<T = any> {
    columns: ProColumns<T>[];
    columnsMap: {
        [key: string]: ColumnsState;
    };
    setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
    setSortKeyColumns: (sortedColumns: (string | number)[]) => void;
    sortKeyColumns: (string | number)[];
}

const ToolTipIcon: React.FC<{
    title: string;
    columnKey: string | number;
    show: boolean;
    fixed: 'left' | 'right' | undefined;
    columnsMap: {
        [key: string]: ColumnsState;
    };
    setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
}> = ({ title, columnsMap, setColumnsMap, show, children, columnKey, fixed }) => {
    if (show) {
        return (
            <Tooltip title={title}>
                <span
                    onClick={() => {
                        const config = columnsMap[columnKey || ''] || {};
                        const columnKeyMap = {
                            ...columnsMap,
                            [columnKey]: { ...config, fixed } as ColumnsState,
                        };
                        setColumnsMap(columnKeyMap);
                    }}
                >
                    {children}
                </span>
            </Tooltip>
        );
    }
    return null;
};

const CheckboxListItem: React.FC<{
    columnKey: string | number;
    className?: string;
    title?: React.ReactNode;
    columnsMap: {
        [key: string]: ColumnsState;
    };
    fixed?: boolean | 'left' | 'right';
    setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
}> = ({ columnKey, className, columnsMap, title, setColumnsMap, fixed }) => {
    const config = columnsMap[columnKey || 'null'] || { show: true };
    return (
        <span className={`${className}-list-item`} key={columnKey}>
            <Checkbox
                onChange={e => {
                    if (columnKey) {
                        const tempConfig = columnsMap[columnKey || ''] || {};
                        const newSetting = { ...tempConfig };
                        if (e.target.checked) {
                            delete newSetting.show;
                        } else {
                            newSetting.show = false;
                        }
                        const columnKeyMap = {
                            ...columnsMap,
                            [columnKey]: newSetting as ColumnsState,
                        };
                        setColumnsMap(columnKeyMap);
                    }
                }}
                checked={config.show !== false}
            >
                {title}
            </Checkbox>
            <span className={`${className}-list-item-option`}>
                <ToolTipIcon
                    columnsMap={columnsMap}
                    setColumnsMap={setColumnsMap}
                    columnKey={columnKey}
                    fixed="left"
                    title={'固定到左边'}
                    show={fixed !== 'left'}
                >
                    <PushpinOutlined
                        style={{
                            transform: 'rotate(-90deg)',
                        }}
                    />
                </ToolTipIcon>
                <ToolTipIcon
                    columnsMap={columnsMap}
                    setColumnsMap={setColumnsMap}
                    columnKey={columnKey}
                    fixed={undefined}
                    title={'取消固定'}
                    show={!!fixed}
                >
                    <VerticalAlignMiddleOutlined />
                </ToolTipIcon>
                <ToolTipIcon
                    columnsMap={columnsMap}
                    setColumnsMap={setColumnsMap}
                    columnKey={columnKey}
                    fixed="right"
                    title={'固定到右边'}
                    show={fixed !== 'right'}
                >
                    <PushpinOutlined />
                </ToolTipIcon>
            </span>
        </span>
    );
};

const CheckboxList: React.FC<{
    list: (ProColumns<any> & { index?: number })[];
    className?: string;
    title: string;
    showTitle?: boolean;
    sortKeyColumns: (string | number)[];
    setSortKeyColumns: (sortedColumns: (string | number)[]) => void;
    columnsMap: {
        [key: string]: ColumnsState;
    };
    setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
}> = ({
    list,
    sortKeyColumns,
    setSortKeyColumns,
    columnsMap,
    setColumnsMap,
    className,
    showTitle = true,
    title: listTitle,
}) => {
    const show = list && list.length > 0;
    if (!show) {
        return null;
    }
    const move = (id: string, targetIndex: number) => {
        const newColumns = [...sortKeyColumns];
        const findIndex = newColumns.findIndex(columnKey => columnKey === id);
        const key = newColumns[findIndex];
        newColumns.splice(findIndex, 1);
        if (targetIndex === 0) {
            newColumns.unshift(key);
        } else {
            newColumns.splice(targetIndex, 0, key);
        }
        setSortKeyColumns(newColumns);
    };

    const listDom = list.map(({ key, dataIndex, title, fixed, ...rest }, index) => {
        const columnKey = genColumnKey(key, dataIndex || rest.index);
        return (
            <DnDItem
                index={index}
                id={`${columnKey}_${rest.index}`}
                key={columnKey}
                end={(id, targetIndex) => {
                    move(id, targetIndex);
                }}
            >
                <CheckboxListItem
                    setColumnsMap={setColumnsMap}
                    columnKey={columnKey || `${index}`}
                    columnsMap={columnsMap}
                    title={title}
                    fixed={fixed}
                    className={className}
                />
            </DnDItem>
        );
    });
    return (
        <DndProvider backend={Backend}>
            {showTitle && <span className={`${className}-list-title`}>{listTitle}</span>}
            {listDom}
        </DndProvider>
    );
};

const GroupCheckboxList: React.FC<{
    localColumns: (ProColumns<any> & { index?: number })[];
    className?: string;
    columnsMap: {
        [key: string]: ColumnsState;
    };
    setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
    setSortKeyColumns: (sortedColumns: (string | number)[]) => void;
    sortKeyColumns: (string | number)[];
}> = ({
    localColumns,
    columnsMap,
    setColumnsMap,
    sortKeyColumns,
    setSortKeyColumns,
    className,
}) => {
    const rightList: (ProColumns<any> & { index?: number })[] = [];
    const leftList: (ProColumns<any> & { index?: number })[] = [];
    const list: (ProColumns<any> & { index?: number })[] = [];
    localColumns.forEach(item => {
        const { fixed } = item;
        if (fixed === 'left') {
            leftList.push(item);
            return;
        }
        if (fixed === 'right') {
            rightList.push(item);
            return;
        }
        list.push(item);
    });
    const showRight = rightList && rightList.length > 0;
    const showLeft = leftList && leftList.length > 0;
    return (
        <div className={`${className}-list`}>
            <CheckboxList
                columnsMap={columnsMap}
                setColumnsMap={setColumnsMap}
                setSortKeyColumns={setSortKeyColumns}
                sortKeyColumns={sortKeyColumns}
                title={'固定在左侧'}
                list={leftList}
                className={className}
            />
            {/* 如果没有任何固定，不需要显示title */}
            <CheckboxList
                columnsMap={columnsMap}
                setColumnsMap={setColumnsMap}
                setSortKeyColumns={setSortKeyColumns}
                sortKeyColumns={sortKeyColumns}
                list={list}
                title={'不固定'}
                showTitle={showLeft || showRight}
                className={className}
            />
            <CheckboxList
                columnsMap={columnsMap}
                setColumnsMap={setColumnsMap}
                setSortKeyColumns={setSortKeyColumns}
                sortKeyColumns={sortKeyColumns}
                title={'固定在右侧'}
                list={rightList}
                className={className}
            />
        </div>
    );
};

const ColumnSetting = <T, U = {}>(props: ColumnSettingProps<T>) => {
    const localColumns: (ProColumns<any> & { index?: number })[] = props.columns || [];
    const { columnsMap, setColumnsMap, setSortKeyColumns, sortKeyColumns } = props;
    /**
     * 设置全部选中，或全部未选中
     * @param show
     */
    const setAllSelectAction = (show: boolean = true) => {
        const columnKeyMap: { [key: string]: ColumnsState } = {};
        localColumns.forEach(({ key, fixed, dataIndex }) => {
            const columnKey = genColumnKey(key, dataIndex);
            if (columnKey) {
                columnKeyMap[columnKey] = {
                    show,
                    fixed: fixed as any,
                };
            }
        });
        setColumnsMap(columnKeyMap);
    };

    const selectKeys = Object.values(columnsMap).filter(value => !value || value.show === false);

    const indeterminate = selectKeys.length > 0 && selectKeys.length !== localColumns.length;

    return (
        <ConfigConsumer>
            {({ getPrefixCls }: ConfigConsumerProps) => {
                const className = getPrefixCls('pro-table-column-setting');
                const toolBarClassName = getPrefixCls('pro-table-toolbar');
                return (
                    <Popover
                        arrowPointAtCenter={true}
                        title={
                            <div className={`${className}-title`}>
                                <Checkbox
                                    indeterminate={indeterminate}
                                    checked={
                                        selectKeys.length === 0 &&
                                        selectKeys.length !== localColumns.length
                                    }
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setAllSelectAction();
                                        } else {
                                            setAllSelectAction(false);
                                        }
                                    }}
                                >
                                    列展示
                                </Checkbox>
                                <a
                                    onClick={() => {
                                        setColumnsMap({});
                                        setSortKeyColumns([]);
                                    }}
                                >
                                    重置
                                </a>
                            </div>
                        }
                        trigger="click"
                        placement="bottomRight"
                        content={
                            <GroupCheckboxList
                                className={className}
                                localColumns={localColumns}
                                sortKeyColumns={sortKeyColumns}
                                setSortKeyColumns={setSortKeyColumns}
                                setColumnsMap={setColumnsMap}
                                columnsMap={columnsMap}
                            />
                        }
                    >
                        <Tooltip title={'列设置'}>
                            <SettingOutlined
                                className={`${toolBarClassName}-item-icon`}
                                style={{
                                    fontSize: 16,
                                }}
                            />
                        </Tooltip>
                    </Popover>
                );
            }}
        </ConfigConsumer>
    );
};

export default ColumnSetting;
