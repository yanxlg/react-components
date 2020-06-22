import React, { useMemo } from 'react';
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
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
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
        onChange,
        form,
        rules,
        required,
        initialValue,
        hide,
        ..._props
    } = props;

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onCheck: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, []);

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
        >
            <Tree className={className} {...eventProps} {..._props} />
        </Form.Item>
    );
};

FormTree.typeList = typeList;

export default FormTree;
