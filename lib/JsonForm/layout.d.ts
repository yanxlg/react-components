import React from 'react';
import { FormInstance } from 'antd/es/form';
import { FormField } from './index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CardProps } from 'antd/es/card';
export declare type LayoutType = 'layout';
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
    header?: React.ReactElement;
    footer?: React.ReactElement;
} & (CardLayoutProps | DefaultLayoutProps);
declare const Layout: {
    (props: LayoutProps<string>): JSX.Element;
    typeList: string[];
};
export default Layout;
