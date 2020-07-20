import React, {
    forwardRef,
    ForwardRefRenderFunction,
    RefObject,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import ColumnSetting, { ColumnSettingProps } from '../columnSetting';

import './index.less';
import FullScreenIcon from './FullscreenIcon';
import DensityIcon, { DensitySize } from './DensityIcon';
import { ProColumns, ColumnsState } from '../../Table';

export interface OptionConfig {
    density: {
        tableSize?: DensitySize;
        setTableSize: (tableSize: DensitySize) => void;
    };
    fullScreen?: boolean | OptionsType;
    reload?: OptionsType;
    setting: boolean;
}

export type OptionsType = () => void;

export interface ToolBarProps {
    headerTitle?: React.ReactNode;
    toolBarRender?: (selectedRowKeys?: (string | number)[]) => React.ReactNode[];
    options?: OptionConfig | false;
    selectedRowKeys?: (string | number)[];
    className?: string;
    onFullScreen?: () => void;
    toolbarRef?: RefObject<ToolBarRef>;
}

export interface ToolBarRef {
    updateSelectedState: (selectedRowKeys: (string | number)[]) => void;
}

const getButtonText = <T, U = {}>({}: {}, config: OptionConfig) => ({
    fullScreen: {
        text: '全屏',
        icon: <FullScreenIcon />,
    },
    reload: {
        text: '刷新',
        icon: <ReloadOutlined />,
    },
    setting: {
        text: '列设置',
        icon: <SettingOutlined />,
    },
    density: {
        text: '表格密度',
        icon: (
            <DensityIcon
                tableSize={config.density.tableSize}
                setTableSize={config.density.setTableSize}
            />
        ),
    },
});

/**
 * 渲染默认的 工具栏
 * @param options
 * @param className
 * @param defaultOptions
 */
const renderDefaultOption = (
    options: ToolBarProps['options'],
    className: string,
    defaultOptions: {
        columns: ProColumns<any>[];
        columnsMap: {
            [key: string]: ColumnsState;
        };
        setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
        setSortKeyColumns: (sortedColumns: (string | number)[]) => void;
        sortKeyColumns: (string | number)[];
    },
) =>
    options &&
    Object.keys(options)
        .filter(item => item)
        .map((key, index) => {
            const value = ((options as unknown) as { [key: string]: OptionsType })[key];
            if (!value) {
                return null;
            }
            if (key === 'setting') {
                return (
                    <ColumnSetting
                        key={key}
                        columns={defaultOptions.columns}
                        columnsMap={defaultOptions.columnsMap}
                        setColumnsMap={defaultOptions.setColumnsMap}
                        setSortKeyColumns={defaultOptions.setSortKeyColumns}
                        sortKeyColumns={defaultOptions.sortKeyColumns}
                    />
                );
            }
            if (key === 'fullScreen') {
                return (
                    <span
                        key={key}
                        style={{
                            marginLeft: index === 0 ? 8 : 16,
                        }}
                        className={className}
                        onClick={value}
                    >
                        <FullScreenIcon />
                    </span>
                );
            }

            const optionItem = ((getButtonText(defaultOptions, options) as unknown) as {
                [key: string]: { text: string; icon: React.ReactElement };
            })[key];

            if (optionItem) {
                return (
                    <span
                        key={key}
                        style={{
                            marginLeft: index === 0 ? 8 : 16,
                        }}
                        className={className}
                        onClick={value && typeof value === 'function' ? value : undefined}
                    >
                        <Tooltip title={optionItem.text}>{optionItem.icon}</Tooltip>
                    </span>
                );
            }
            return null;
        })
        .filter(item => item);

const ToolBar: ForwardRefRenderFunction<ToolBarRef, ToolBarProps & ColumnSettingProps> = (
    {
        headerTitle,
        toolBarRender,
        sortKeyColumns,
        setSortKeyColumns,
        columns,
        columnsMap,
        setColumnsMap,
        options,
        className,
        selectedRowKeys,
    },
    ref,
) => {
    const [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState<(string | number)[]>([]);

    const optionDom = useMemo(() => {
        return (
            renderDefaultOption(options, `${className}-item-icon`, {
                sortKeyColumns,
                setSortKeyColumns,
                columns,
                columnsMap,
                setColumnsMap,
            }) || []
        );
    }, [options, columns, sortKeyColumns, columnsMap]);

    const _selectedRowKeys = selectedRowKeys !== void 0 ? selectedRowKeys : innerSelectedRowKeys;

    // 操作列表
    const actions = useMemo(() => {
        return toolBarRender ? toolBarRender(_selectedRowKeys) : [];
    }, [toolBarRender, _selectedRowKeys]);

    useImperativeHandle(
        ref,
        () => {
            return {
                updateSelectedState: (selectedRowKeys: (string | number)[]) => {
                    setInnerSelectedRowKeys(selectedRowKeys);
                },
            };
        },
        [],
    );

    return useMemo(() => {
        return (
            <div className={className}>
                <div className={`${className}-title`}>{headerTitle}</div>
                <div className={`${className}-option`}>
                    {actions
                        .filter(item => item)
                        .map((node, index) => (
                            <div
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                className={`${className}-item`}
                            >
                                {node}
                            </div>
                        ))}
                    <div className={`${className}-default-option`}>
                        {optionDom.length > 0 && actions.length > 0 && <Divider type="vertical" />}
                        {optionDom}
                    </div>
                </div>
            </div>
        );
    }, [actions, optionDom, toolBarRender]);
};

const ToolbarWrap = forwardRef(ToolBar);

const WarpToolBar = (props: ToolBarProps & ColumnSettingProps) => (
    <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
            const className = getPrefixCls('pro-table-toolbar');
            const { toolbarRef, ..._props } = props;
            return <ToolbarWrap className={className} {..._props} ref={toolbarRef} />;
        }}
    </ConfigConsumer>
);

export default WarpToolBar;
