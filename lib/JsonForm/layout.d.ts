import React from 'react';
import { FormInstance } from 'antd/es/form';
import { FormField } from './index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CardProps } from 'antd/es/card';
export declare type LayoutType = 'layout';
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
declare const Layout: {
    (props: LayoutProps<string>): JSX.Element;
    typeList: string[];
};
export default Layout;
