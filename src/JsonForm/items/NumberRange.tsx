import React, { useMemo } from 'react';
import { Form, Input } from 'antd';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import RichInput, { RichType } from '../../RichInput';
import { InputProps as AntInputProps } from 'antd/es/input';
import formStyles from '../_form.less';
import { FormatterType } from '../../utils/formatter';
import classnames from 'classnames';

export type NumberRangeType =
    | 'inputRange'
    | 'integerRange'
    | 'numberRange'
    | 'positiveIntegerRange';
const typeList = ['inputRange', 'integerRange', 'numberRange', 'positiveIntegerRange'];

export type NumberRangeProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: NumberRangeType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: [FormItemName<T>, FormItemName<T>];
        formatter?: FormatterType;
        rules?: Rule[];
        labelClassName?: string;
        initialValue?: any;
    } & Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;

const FormNumberRange = (props: NumberRangeProps) => {
    const {
        name,
        placeholder,
        label,
        className = formStyles.flex1, // formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        type,
        rules = [],
        colon,
        initialValue,
        ..._props
    } = props;
    const [name1, name2] = name;
    // console.log(11111111, name1, name2);

    const _type = type.replace('Range', '') as RichType;

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
                name="_range"
                label={<span className={labelClassName}>{label}</span>}
                colon={colon}
                validateTrigger="onBlur"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            const min = getFieldValue(name1);
                            const max = getFieldValue(name2);
                            if (min && max && Number(min) > Number(max)) {
                                return Promise.reject('请检查区间!');
                            }
                            return Promise.resolve();
                        },
                    }),
                    ...rules,
                ]}
            >
                <Input.Group compact className={formStyles.flex}>
                    <Form.Item
                        name={name1}
                        className={classnames(formStyles.marginNone)}
                        initialValue={initialValue?.[0]}
                    >
                        <RichInput
                            placeholder={placeholder}
                            className={classnames(
                                formStyles.inputRange,
                                formStyles.inputRangeLeft,
                                className,
                            )}
                            {..._props}
                            {...eventProps}
                            richType={_type}
                        />
                    </Form.Item>
                    <Input className={formStyles.inputRangeSplit} placeholder="~" disabled />
                    <Form.Item
                        name={name2}
                        className={classnames(formStyles.marginNone)}
                        initialValue={initialValue?.[1]}
                    >
                        <RichInput
                            placeholder={placeholder}
                            className={classnames(
                                formStyles.inputRange,
                                formStyles.inputRangeRight,
                                className,
                            )}
                            {..._props}
                            {...eventProps}
                            richType={_type}
                        />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
        );
    }, [_props]);
};

FormNumberRange.typeList = typeList;

export default FormNumberRange;
