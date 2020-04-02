import React from "react";
import {Card} from "antd";
import {FormInstance} from "antd/es/form";
import {FormField, getFormItems} from "./index";
import {ColProps} from "antd/lib/grid/col";
import {RowProps} from "antd/lib/grid/row";
import {CardProps} from "antd/es/card";

export type LayoutType = 'layout';
const typeList = ['layout'];

export declare type LayoutProps<T = string> = {
    form: FormInstance;
    type: LayoutType;
    layoutType?: "card";
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
} & Omit<CardProps, "type">

const Layout = (props: LayoutProps) => {
    const {form, labelClassName, layoutType, fieldList, itemCol, itemRow} = props;

    switch (layoutType) {
        case "card":
            return (
                <Card>
                    {
                        getFormItems(fieldList, form, labelClassName, itemCol, itemRow)
                    }
                </Card>
            );
        default:
            return null;
    }
};

Layout.typeList = typeList;

export default Layout;