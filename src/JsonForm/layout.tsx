import React from 'react';
import { Card, Collapse } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormField, getFormItems } from './index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CardProps } from 'antd/es/card';
import { CollapseProps } from 'antd/lib/collapse/Collapse';
import { CollapsePanelProps } from 'antd/es/collapse';
import { CaretRightOutlined } from '@ant-design/icons/lib';

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

declare interface CollapseLayoutProps<T = string> extends BaseLayoutProps<T>, CollapseProps {
    layoutType: 'collapse';
    panelProps: Omit<CollapsePanelProps, 'header'> & {
        header: FormField;
    };
}

export declare type LayoutProps<T = string> =
    | CardLayoutProps<T>
    | DefaultLayoutProps<T>
    | CollapseLayoutProps<T>;

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
        case 'collapse':
            const { panelProps, ...__props } = _props as CollapseLayoutProps;
            return (
                <Collapse
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    {...(__props as CollapseProps)}
                >
                    <Collapse.Panel
                        {...panelProps}
                        header={getFormItems(
                            [panelProps.header],
                            form,
                            labelClassName,
                            itemCol,
                            itemRow,
                        )}
                    >
                        {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
                    </Collapse.Panel>
                </Collapse>
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
