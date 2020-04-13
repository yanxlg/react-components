import React from 'react';
import { Card } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormField, getFormItems } from './index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CardProps } from 'antd/es/card';

export type LayoutType = 'layout';
const typeList = ['layout'];

declare type CardLayoutProps = {
    layoutType: 'card';
} & Omit<CardProps, 'type'>;

declare type DefaultLayoutProps = {
    layoutType?: 'default';
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'type'>;

export declare type LayoutProps<T = string> = {
    form: FormInstance;
    type: LayoutType;
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
} & (CardLayoutProps | DefaultLayoutProps);

const Layout = (props: LayoutProps) => {
    const {
        form,
        labelClassName,
        layoutType,
        type,
        fieldList,
        itemCol,
        itemRow,
        ..._props
    } = props;
    switch (layoutType) {
        case 'card':
            return (
                <Card {...(_props as CardLayoutProps)}>
                    {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
                </Card>
            );
        default:
            return (
                <div {...(_props as DefaultLayoutProps)}>
                    {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
                </div>
            );
    }
};

Layout.typeList = typeList;

export default Layout;
