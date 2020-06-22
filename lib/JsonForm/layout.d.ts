import React from 'react';
import { FormInstance } from 'antd/es/form';
import { FormField } from './index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CardProps } from 'antd/es/card';
import { CollapseProps } from 'antd/lib/collapse/Collapse';
import { CollapsePanelProps } from 'antd/es/collapse';
export declare type LayoutType = 'layout';
declare type CardLayoutProps = {
    layoutType: 'card';
} & Omit<CardProps, 'type'>;
declare type DefaultLayoutProps = {
    layoutType?: 'default';
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'type'>;
declare type CollapseLayoutProps = {
    layoutType: 'collapse';
    panelProps: Omit<CollapsePanelProps, 'header'> & {
        header: FormField;
    };
} & CollapseProps;
export declare type LayoutProps<T = string> = {
    form: FormInstance;
    type: LayoutType;
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
    header?: React.ReactElement;
    footer?: React.ReactElement;
} & (CardLayoutProps | DefaultLayoutProps | CollapseLayoutProps);
declare const Layout: {
    (props: LayoutProps<string>): JSX.Element;
    typeList: string[];
};
export default Layout;
