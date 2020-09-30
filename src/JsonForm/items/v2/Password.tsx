import { Form, Input } from 'antd';
import React, { useMemo, useState } from 'react';
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { PasswordProps } from 'antd/es/input';
import formStyles from '../../_form.less';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { NamePath } from 'rc-field-form/lib/interface';
import { FormatterType } from '../../../utils/formatter';
import classNames from 'classnames';

export type PasswordType = 'password@2';
const typeList = ['password@2'];

export type FormPasswordProps<T = string> = Omit<FormItemProps, 'children'> & {
    type: PasswordType;
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string;
    defaultVisible?: boolean;
    childrenProps?: Omit<PasswordProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
};

const FormPassword = (props: FormPasswordProps) => {
    const {
        className = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        childrenProps,
        labelCol,
        formatter,
        defaultVisible,
        ...formItemProps
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

    const iconRender = useMemo(() => {
        return (
            childrenProps?.iconRender ||
            function(visible: boolean) {
                return visible
                    ? /*#__PURE__*/ React.createElement(EyeOutlined, null)
                    : /*#__PURE__*/ React.createElement(EyeInvisibleOutlined, null);
            }
        );
    }, []);

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
                className={className}
                labelCol={{
                    ...labelCol,
                    className: classNames(labelCol?.className, labelClassName),
                }}
                {...formItemProps}
            >
                <Input
                    className={formStyles.formItemDefault}
                    {...(childrenProps as PasswordProps)}
                    {...eventProps}
                    suffix={suffix}
                    type={visible ? 'text' : 'password'}
                />
            </Form.Item>
        );
    }, [childrenProps, visible]);
};

FormPassword.typeList = typeList;

export default FormPassword;
