import React from 'react';
import { Form, Tree } from 'antd';
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
import formStyles from '../_form.less';
import { TreeProps } from 'antd/es/tree';

export type FormTreeType = 'tree';
const typeList = ['tree'];

export type FormTreeProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: FormTreeType;
        className?: string;
        formItemClassName?: string;
        name: FormItemName<T>;
        rules?: Rule[];
        labelClassName?: string;
        required?: boolean;
        initialValue?: any;
        hide?: boolean;
    } & TreeProps;

const FormTree = (props: FormTreeProps) => {
    const {
        name,
        label,
        labelClassName,
        formItemClassName = formStyles.formItem,
        className,
        form,
        rules,
        required,
        initialValue,
        hide,
        ..._props
    } = props;

    const requiredProps = required
        ? {
              required: required,
          }
        : {};

    return (
        <Form.Item
            name={name}
            label={label ? <span className={labelClassName}>{label}</span> : undefined}
            className={formItemClassName}
            {...requiredProps}
            rules={rules}
            initialValue={initialValue}
            style={
                hide
                    ? {
                          display: 'none',
                      }
                    : {}
            }
            valuePropName={'checkedKeys'}
            trigger={'onCheck'}
        >
            <Tree className={className} {..._props} />
        </Form.Item>
    );
};

FormTree.typeList = typeList;

export default FormTree;
