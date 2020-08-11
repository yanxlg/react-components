import { Form, Cascader } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import formStyles from '../_form.less';
import { CascaderProps as AntdCascaderProps, FieldNamesType } from 'antd/es/cascader/index';
import { FormatterType } from '../../utils/formatter';
import { CascaderOptionType } from 'antd/es/cascader';
import { IOptionItem } from './Select';

export type CascaderType = 'cascader';
const typeList = ['cascader'];

type OptionsPromise = () => Promise<IOptionItem[]>;

function filter(inputValue: string, path: CascaderOptionType[], fieldNames: FieldNamesType) {
    return path.some(option => {
        return (
            (option[fieldNames ? fieldNames.label : 'label'] as string)
                .toLowerCase()
                .indexOf(inputValue.toLowerCase()) > -1
        );
    });
}

export type CascaderProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        type: CascaderType;
        form: FormInstance;
        optionList?: IOptionItem[] | OptionsPromise;
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
        optionList,
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
        options,
        ...extraProps
    } = props;

    const [list, setList] = useState<IOptionItem[] | undefined>(undefined);

    const isFunction = typeof optionList === 'function';

    useEffect(() => {
        if (isFunction) {
            (optionList as OptionsPromise)()
                .then(list => {
                    setList(list);
                })
                .catch(() => {
                    setList([]);
                });
        }
    }, []);

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
                    showSearch={{
                        filter: (inputValue, path) =>
                            filter(inputValue, path, extraProps.fieldNames),
                    }}
                    {...eventProps}
                    {...extraProps}
                    options={options ? options : list}
                />
            </Form.Item>
        );
    }, [extraProps, disabled, hide, list]);
};

FormCascader.typeList = typeList;

export default FormCascader;
