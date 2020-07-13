import { DatePicker, Form } from 'antd';
import React, { useMemo } from 'react';
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps, Rule } from 'antd/es/form';
import formStyles from '../../_form.less';
import classNames from 'classnames';
import { FormatterType } from '../../../utils/formatter';
import { NamePath } from 'rc-field-form/lib/interface';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import { getValueByNamePath } from './Select';
import { Moment } from 'moment';

export type DateRangerType = 'dateRanger@2';
const typeList = ['dateRanger@2'];

export type DateRangerProps = Omit<FormItemProps, 'children' | 'rules' | 'name'> & {
    form: FormInstance;
    type: DateRangerType;
    className?: string;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: [NamePath, NamePath];
    formatter?: [FormatterType] | [FormatterType, FormatterType];
    rules?: [Rule[]] | [Rule[], Rule[]]; // 复合
    labelClassName?: string;
    initialValue?: [any] | [any, any];
    childrenProps?: Omit<PickerProps<Dayjs>, 'onChange'>;
};

const FormDateRanger = (props: DateRangerProps) => {
    const {
        name: [name1, name2],
        className = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        type,
        rules,
        initialValue,
        childrenProps,
        formatter,
        labelCol,
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
        const itemClassName = classNames(
            formStyles.inlineBlock,
            formStyles.marginNone,
            formStyles.verticalMiddle,
        );
        return (
            <Form.Item
                labelCol={{
                    ...labelCol,
                    className: classNames(labelCol?.className, labelClassName),
                }}
                className={className}
                {...formItemProps}
            >
                <Form.Item
                    shouldUpdate={(prevValues, currentValues) =>
                        getValueByNamePath(prevValues, name2) !==
                        getValueByNamePath(currentValues, name2)
                    }
                    className={itemClassName}
                >
                    {({ getFieldValue }) => {
                        const endTime = getFieldValue(name2);
                        return (
                            <Form.Item
                                name={name1}
                                className={formStyles.marginNone}
                                rules={rules?.[0]}
                                initialValue={initialValue?.[0]}
                                colon={false}
                            >
                                <DatePicker
                                    disabledDate={currentDate =>
                                        currentDate
                                            ? endTime
                                                ? currentDate.isAfter(endTime)
                                                : false
                                            : false
                                    }
                                    {...(childrenProps as PickerProps<Moment>)}
                                    {...event1Props}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
                <span className={classNames(formStyles.formColon, formStyles.verticalMiddle)}>
                    -
                </span>
                <Form.Item
                    className={itemClassName}
                    shouldUpdate={(prevValues, currentValues) =>
                        getValueByNamePath(prevValues, name1) !==
                        getValueByNamePath(currentValues, name1)
                    }
                >
                    {({ getFieldValue }) => {
                        const startTime = getFieldValue(name1);
                        return (
                            <Form.Item
                                name={name2}
                                className={formStyles.marginNone}
                                rules={rules?.[1]}
                                initialValue={initialValue?.[1]}
                                colon={false}
                            >
                                <DatePicker
                                    disabledDate={currentDate =>
                                        currentDate
                                            ? startTime
                                                ? currentDate.isBefore(startTime)
                                                : false
                                            : false
                                    }
                                    {...(childrenProps as PickerProps<Moment>)}
                                    {...event2Props}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Form.Item>
        );
    }, [childrenProps]);
};

FormDateRanger.typeList = typeList;

export default FormDateRanger;
