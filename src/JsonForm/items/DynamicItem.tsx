/**
 * 动态FormItem
 */
import React from 'react';
import { Form } from 'antd';
import { FormField, getFormItem } from '../index';
import { FormInstance } from 'antd/es/form';
import { ShouldUpdate } from 'rc-field-form/es/Field';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';

export type DynamicType = 'dynamic';
const typeList = ['dynamic'];

export declare interface DynamicItemProps {
    type: DynamicType;
    form: FormInstance;
    dynamic: (form: FormInstance) => FormField;
    shouldUpdate: ShouldUpdate;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
}

const DynamicItem = ({
    form,
    dynamic,
    shouldUpdate,
    labelClassName,
    itemCol,
    itemRow,
}: DynamicItemProps) => {
    return (
        <Form.Item shouldUpdate={shouldUpdate} noStyle={true}>
            {({ getFieldValue }) => {
                const formField = dynamic(form);
                return getFormItem(formField, form, labelClassName, itemCol, itemRow);
            }}
        </Form.Item>
    );
};

DynamicItem.typeList = typeList;

export default DynamicItem;
