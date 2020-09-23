import { Form, Switch } from 'antd';
import React, { useMemo } from 'react';
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { SwitchProps as AntSwitchProps } from 'antd/es/switch';
import formStyles from '../../_form.less';
import { NamePath } from 'rc-field-form/lib/interface';
import classNames from 'classnames';

export type SwitchType = 'switch@2';

const typeList = ['switch@2'];

export type SwitchProps<T = string> = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    labelClassName?: string;
    type: SwitchType;
    childrenProps?: Omit<AntSwitchProps, 'onChange'>;
    onValue?: string;
    offValue?: string;
};

const FormSwitch = (props: SwitchProps) => {
    const {
        className = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        type,
        childrenProps,
        labelCol,
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
                <Switch
                    className={formStyles.formItemDefault}
                    {...(childrenProps as AntSwitchProps)}
                    {...eventProps}
                />
            </Form.Item>
        );
    }, [childrenProps, formItemProps]);
};

FormSwitch.typeList = typeList;

export default FormSwitch;
