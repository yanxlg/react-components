import { Form, Input } from 'antd';
import React, { useMemo } from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { PasswordProps } from 'antd/es/input';
import formStyles from '../_form.less';

export type PasswordType = 'password';
const typeList = ['password'];

export type FormPasswordProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: PasswordType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        rules?: Rule[];
        labelClassName?: string;
        initialValue?: any;
    } & Omit<PasswordProps, 'type' | 'size' | 'form' | 'onChange'>;

const FormPassword = (props: FormPasswordProps) => {
    const {
        name,
        label,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        type,
        rules,
        colon,
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

    return useMemo(() => {
        return (
            <Form.Item
                className={formItemClassName}
                name={name}
                label={<span className={labelClassName}>{label}</span>}
                rules={rules}
                colon={colon}
                initialValue={initialValue}
            >
                <Input.Password className={className} {..._props} {...eventProps} />
            </Form.Item>
        );
    }, [_props]);
};

FormPassword.typeList = typeList;

export default FormPassword;
