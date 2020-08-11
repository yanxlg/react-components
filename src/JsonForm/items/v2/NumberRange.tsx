import React, { useMemo } from 'react';
import { Form, Input } from 'antd';
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps } from 'antd/es/form';
import formStyles from '../../_form.less';
import { FormatterType } from '../../../utils/formatter';
import { NamePath } from 'rc-field-form/lib/interface';
import { InputProps as AntInputProps } from 'antd/es/input/Input';
import classNames from 'classnames';
import RichInput from '../../../RichInput';

export type NumberRangeType = 'numberRange@2';
const typeList = ['numberRange@2'];

export type NumberRangeProps = Omit<
    FormItemProps,
    'children' | 'rules' | 'initialValue' | 'name'
> & {
    form: FormInstance;
    type: NumberRangeType;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: [NamePath, NamePath];
    formatter?: FormatterType;
    precision?: number; // 精度
    labelClassName?: string;
    initialValue?: [any] | [any, any];
    childrenProps?: Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
    addonAfter?: React.ReactNode;
    maxDigits?: number;
};

const FormInputRange = (props: NumberRangeProps) => {
    const {
        className = formStyles.formItem,
        name: [name1, name2],
        onChange,
        labelClassName,
        labelCol,
        form,
        precision = 0,
        initialValue,
        addonAfter,
        childrenProps,
        maxDigits,
        ...formItemProps
    } = props;

    const event1Props = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name1 as FormItemName, form);
                  },
              }
            : {};
    }, []);

    const event2Props = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name2 as FormItemName, form);
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
                name="___range"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            const min = getFieldValue(name1);
                            const max = getFieldValue(name2);
                            if (min && max && Number(min) > Number(max)) {
                                return Promise.reject('最大值不能小于最小值!');
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
                {...formItemProps}
            >
                <Input.Group compact className={classNames(formStyles.flex, formStyles.flexAlign)}>
                    <Form.Item
                        name={name1}
                        validateTrigger="onBlur"
                        initialValue={initialValue?.[0]}
                        noStyle={true}
                    >
                        <RichInput
                            richType="number"
                            precision={precision}
                            maxDigits={maxDigits}
                            {...event1Props}
                            {...childrenProps}
                            className={classNames(
                                childrenProps?.className || formStyles.inputRange,
                                formStyles.inputRangeFocus,
                            )}
                        />
                    </Form.Item>
                    <Input className={formStyles.inputRangeSplit} placeholder="~" disabled />
                    <Form.Item
                        name={name2}
                        validateTrigger="onBlur"
                        initialValue={initialValue?.[1]}
                        noStyle={true}
                    >
                        <RichInput
                            richType="number"
                            precision={precision}
                            maxDigits={maxDigits}
                            {...event2Props}
                            className={classNames(
                                childrenProps?.className || formStyles.inputRange,
                                formStyles.inputRangeRight,
                                formStyles.inputRangeFocus,
                            )}
                        />
                    </Form.Item>
                    {addonAfter ? (
                        <span
                            className={[formStyles.endExtra, formStyles.verticalMiddle].join(' ')}
                        >
                            {addonAfter}
                        </span>
                    ) : null}
                </Input.Group>
            </Form.Item>
        );
    }, []);
};

FormInputRange.typeList = typeList;

export default FormInputRange;
