/// <reference types="react" />
import { FormInstance } from "antd/es/form";
import { FormField } from "./index";
import { ColProps } from "antd/lib/grid/col";
import { RowProps } from "antd/lib/grid/row";
import { CardProps } from "antd/es/card";
export declare type LayoutType = 'layout';
export declare type LayoutProps<T = string> = {
    form: FormInstance;
    type: LayoutType;
    layoutType?: "card";
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
} & Omit<CardProps, "type">;
declare const Layout: {
    (props: LayoutProps<string>): JSX.Element;
    typeList: string[];
};
export default Layout;
