import React from 'react';
import { Card } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormField, getFormItems } from './index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CardProps } from 'antd/es/card';

export type LayoutType = 'layout';
const typeList = ['layout'];

declare type BaseLayoutProps<T = string> = {
    form: FormInstance;
    type: LayoutType;
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
    header?: React.ReactElement;
    footer?: React.ReactElement;
};

declare interface CardLayoutProps<T = string> extends BaseLayoutProps<T>, Omit<CardProps, 'type'> {
    layoutType: 'card';
}

declare interface DefaultLayoutProps<T = string>
    extends BaseLayoutProps<T>,
        Omit<
            React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            'type'
        > {
    layoutType?: 'default';
}

export declare type LayoutProps<T = string> = CardLayoutProps<T> | DefaultLayoutProps<T>;

const Layout = (props: LayoutProps) => {
    const {
        form,
        labelClassName,
        layoutType,
        type,
        fieldList,
        itemCol,
        itemRow,
        header,
        footer,
        ..._props
    } = props;
    switch (layoutType) {
        case 'card':
            return (
                <Card {...(_props as CardProps)}>
                    {header}
                    {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
                    {footer}
                </Card>
            );
        default:
            return (
                <div {...(_props as DefaultLayoutProps)}>
                    {header}
                    {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
                    {footer}
                </div>
            );
    }
};

Layout.typeList = typeList;

export default Layout;
