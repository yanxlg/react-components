import React, { useMemo } from 'react';
import { Form, Radio } from 'antd';
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio/interface';
import formStyles from '../../_form.less';
import { NamePath } from 'rc-field-form/lib/interface';
import classNames from 'classnames';

export type RadioGroupType = 'radioGroup@2';
const typeList = ['radioGroup@2'];

export type RadioGroupProps<T = string> = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    type: RadioGroupType;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    formatter?: undefined;
    labelClassName?: string;
    childrenProps?: Omit<AntdRadioGroupProps, 'onChange'>;
};

const FormRadioGroup = (props: RadioGroupProps) => {
    const {
        className = formStyles.formItem,
        labelClassName,
        onChange,
        labelCol,
        formatter,
        form,
        childrenProps,
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
    }, [onChange]);

    return (
        <Form.Item
            className={className}
            labelCol={{
                ...labelCol,
                className: classNames(labelCol?.className, labelClassName),
            }}
            {...formItemProps}
        >
            <Radio.Group {...eventProps} {...childrenProps} />
        </Form.Item>
    );
};

FormRadioGroup.typeList = typeList;

export default FormRadioGroup;
