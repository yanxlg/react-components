import { Form, Input } from 'antd';
import React, { useMemo } from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input';
import formStyles from '../_form.less';
import { FormatterType } from '../../utils/formatter';

const { TextArea } = Input;

export type TextAreaType = 'textarea';
const typeList = ['textarea'];

export type TextAreaProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: TextAreaType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: FormatterType;
        rules?: Rule[];
    } & Omit<AntTextAreaProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;

const FormTextArea = (props: TextAreaProps) => {
    const {
        name,
        placeholder,
        label,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        type,
        rules,
        autoSize = true,
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
            >
                <TextArea
                    autoSize={autoSize}
                    placeholder={placeholder}
                    className={className}
                    {..._props}
                    {...eventProps}
                />
            </Form.Item>
        );
    }, [_props]);
};

FormTextArea.typeList = typeList;

export default FormTextArea;
