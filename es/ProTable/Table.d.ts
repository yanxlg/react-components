import "./index.less";
import React, { CSSProperties } from "react";
import { ColumnType } from "antd/es/table";
import { OptionConfig, ToolBarProps } from "./component/toolBar";
import { RenderedCell } from "rc-table/lib/interface";
import { TableRowSelection } from "antd/es/table/interface";
import { DensitySize } from "./component/toolBar/DensityIcon";
import { TableProps } from "antd/lib/table";
export interface ColumnsState {
    show?: boolean;
    fixed?: "right" | "left" | undefined;
}
export interface ProColumnType<T = unknown> extends Omit<ColumnType<T>, "render"> {
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
export declare type ProColumns<T> = ProColumnGroupType<T> | ProColumnType<T>;
export declare type SimpleRowSelection<T> = Omit<
    TableRowSelection<T>,
    | "type"
    | "getCheckboxProps"
    | "onSelect"
    | "onSelectMultiple"
    | "onSelectAll"
    | "onSelectInvert"
    | "selections"
    | "hideDefaultSelections"
    | "columnTitle"
>;
export interface ProTableProps<
    T,
    U extends {
        [key: string]: any;
    }
> extends Omit<TableProps<T>, "columns" | "rowSelection"> {
    columns?: ProColumns<T>[];
    onColumnsStateChange?: (map: { [key: string]: ColumnsState }) => void;
    onSizeChange?: (size: DensitySize) => void;
    /**
     * 渲染操作栏
     */
    toolBarRender?: ToolBarProps["toolBarRender"] | false;
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
        | (Omit<OptionConfig, "density"> & {
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
    tableAlertOptionRender?: ((props: { onCleanSelected?: () => void }) => React.ReactNode) | false;
    rowSelection?: SimpleRowSelection<T>;
    style?: React.CSSProperties;
    bottom?: number;
    minHeight?: number;
    autoFitY?: boolean;
    optimize?: boolean;
}
/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */
declare const ProviderWarp: <
    T,
    U extends {
        [key: string]: any;
    } = {}
>(
    props: ProTableProps<T, U>,
) => JSX.Element;
export default ProviderWarp;
