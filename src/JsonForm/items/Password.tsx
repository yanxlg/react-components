import { Form, Input } from 'antd';
import React, { useMemo, useState } from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { PasswordProps } from 'antd/es/input';
import formStyles from '../_form.less';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

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
        defaultVisible?: boolean;
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
        iconRender,
        defaultVisible = false,
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

    const [visible, setVisible] = useState(defaultVisible);

    const suffix = useMemo(() => {
        const icon = iconRender(visible);
        const iconProps = {
            onClick: () => {
                setVisible(visible => !visible);
            },
            className: formStyles.formPwdIcon,
            onMouseDown: (e: MouseEvent) => {
                e.preventDefault();
            },
            onMouseUp: (e: MouseEvent) => {
                e.preventDefault();
            },
        };
        return /*#__PURE__*/ React.cloneElement(
            /*#__PURE__*/ React.isValidElement(icon)
                ? icon
                : /*#__PURE__*/ React.createElement('span', null, icon),
            iconProps,
        );
    }, [visible]);

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
                <Input
                    className={className}
                    {..._props}
                    {...eventProps}
                    suffix={suffix}
                    type={visible ? 'text' : 'password'}
                />
            </Form.Item>
        );
    }, [_props, visible]);
};

FormPassword.defaultProps = {
    iconRender: function(visible: boolean) {
        return visible
            ? /*#__PURE__*/ React.createElement(EyeOutlined, null)
            : /*#__PURE__*/ React.createElement(EyeInvisibleOutlined, null);
    },
};

FormPassword.typeList = typeList;

export default FormPassword;
