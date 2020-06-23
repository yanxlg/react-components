import React from 'react';
import { Collapse } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormField, getFormItems } from '../index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CollapsePanelProps, CollapseProps } from 'antd/es/collapse';
import formStyles from '../_form.less';

export type CollapseLayoutType = 'collapse';
const typeList = ['collapse'];

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

const CollapseLayout = (props: CollapseLayoutProps) => {
    const {
        form,
        labelClassName,
        type,
        fieldList,
        itemCol,
        itemRow,
        header,
        footer,
        panel: { header: _header, ...__props },
        ..._props
    } = props;
    return (
        <Collapse className={formStyles.formCollapse} {..._props}>
            <Collapse.Panel header={getFormItems([_header], form)} {...__props}>
                {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
            </Collapse.Panel>
        </Collapse>
    );
};

CollapseLayout.typeList = typeList;

export default CollapseLayout;
