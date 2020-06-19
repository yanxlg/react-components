import { Form, Cascader } from 'antd';
import React, { useMemo } from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import formStyles from '../_form.less';
import { CascaderProps as AntdCascaderProps } from 'antd/es/cascader/index';
import { FormatterType } from '../../utils/formatter';
import { CascaderOptionType } from 'antd/es/cascader';

export type CascaderType = 'cascader';
const typeList = ['cascader'];

function filter(inputValue: string, path: CascaderOptionType[]) {
    return path.some(
        option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
}

export type CascaderProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        type: CascaderType;
        form: FormInstance;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: FormatterType;
        rules?: Rule[];
        labelClassName?: string;
        initialValue?: any;
        hide?: boolean;
    } & Omit<AntdCascaderProps, 'loading' | 'onChange' | 'className'>;

const FormCascader = (props: CascaderProps) => {
    const {
        name,
        label,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        rules,
        placeholder,
        disabled,
        initialValue,
        hide,
        ...extraProps
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
                name={name}
                className={formItemClassName}
                label={<span className={labelClassName}>{label}</span>}
                rules={rules}
                initialValue={initialValue}
                style={
                    hide
                        ? {
                              display: 'none',
                          }
                        : {}
                }
            >
                <Cascader
                    disabled={disabled}
                    className={className}
                    placeholder={placeholder}
                    showSearch={{ filter }}
                    {...eventProps}
                    {...extraProps}
                />
            </Form.Item>
        );
    }, [extraProps, disabled, hide]);
};

FormCascader.typeList = typeList;

export default FormCascader;
