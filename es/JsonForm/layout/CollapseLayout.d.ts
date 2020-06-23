import React from 'react';
import { FormInstance } from 'antd/es/form';
import { FormField } from '../index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CollapsePanelProps, CollapseProps } from 'antd/es/collapse';
export declare type CollapseLayoutType = 'collapse';
export declare interface CollapseLayoutProps<T = string> extends CollapseProps {
    form: FormInstance;
    type: CollapseLayoutType;
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    panel: CollapsePanelProps & {
        header: FormField<T>;
    };
}
declare const CollapseLayout: {
    (props: CollapseLayoutProps<string>): JSX.Element;
    typeList: string[];
};
export default CollapseLayout;
