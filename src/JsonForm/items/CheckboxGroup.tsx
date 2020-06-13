import React, { useMemo } from 'react';
import { Checkbox, Form } from 'antd';
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/lib/checkbox/Group';
import formStyles from '../_form.less';

export type CheckboxGroupType = 'checkboxGroup';
const typeList = ['checkboxGroup'];

export type CheckboxGroupProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: CheckboxGroupType;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        rules?: Rule[];
        labelClassName?: string;
        required?: boolean;
        initialValue?: any;
    } & Omit<AntdCheckboxGroupProps, 'onChange'>;

const FormCheckboxGroup = (props: CheckboxGroupProps) => {
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
        ..._props
    } = props;

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
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
        >
            <Checkbox.Group className={className} {...eventProps} {..._props} />
        </Form.Item>
    );
};

FormCheckboxGroup.typeList = typeList;

export default FormCheckboxGroup;
