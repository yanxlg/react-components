import React, { RefObject } from 'react';
import { ColumnSettingProps } from '../columnSetting';
import './index.less';
import { DensitySize } from './DensityIcon';
export interface OptionConfig {
    density: {
        tableSize?: DensitySize;
        setTableSize: (tableSize: DensitySize) => void;
    };
    fullScreen?: boolean | OptionsType;
    reload?: OptionsType;
    setting: boolean;
}
export declare type OptionsType = () => void;
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
declare const WarpToolBar: (props: ToolBarProps & ColumnSettingProps) => JSX.Element;
export default WarpToolBar;
