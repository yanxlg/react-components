import React, { useCallback, useMemo } from 'react';
import { DatePicker, Form } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { NamePath } from 'rc-field-form/lib/interface';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FormatterType } from '../../../utils/formatter';
import formStyles from '../../_form.less';
import classNames from 'classnames';
import { FormItemName } from '../../index';

export type DatePickerType = 'datePicker@2';
const typeList = ['datePicker@2'];

export type DatePickerProps<T = string> = FormItemProps & {
    type: DatePickerType;
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string;
    dateBeginWith?: Array<FormItemName<T> | 'now'>;
    dateEndWith?: Array<FormItemName<T> | 'now'>;
    childrenProps?: Omit<PickerProps<Dayjs>, 'onChange'>;
};

const FormDatePicker = (props: DatePickerProps) => {
    const {
        className = formStyles.formItem,
        labelCol,
        labelClassName,
        form,
        dateBeginWith,
        dateEndWith,
        onChange,
        childrenProps,
        ...formItemProps
    } = props;

    const disabledStartDate = useCallback((dateBeginWith?: string[]) => {
        if (!dateBeginWith || dateBeginWith.length === 0) {
            return undefined;
        }
        return (startTime: Dayjs | null) => {
            let timeMax: number | undefined;
            // 取最小值=> endOf('d');
            dateBeginWith.map(dependence => {
                const date = dependence === 'now' ? dayjs() : form.getFieldValue(dependence);
                if (date) {
                    const time = date.startOf('day').valueOf();
                    if ((timeMax && time < timeMax) || timeMax === void 0) {
                        timeMax = time;
                    }
                }
            });
            if (!startTime || timeMax === void 0) {
                return false;
            }
            return startTime.startOf('day').valueOf() < timeMax;
        };
    }, []);

    const disabledEndDate = useCallback((dateEndWith?: string[]) => {
        if (!dateEndWith || dateEndWith.length === 0) {
            return undefined;
        }
        return (endTime: Dayjs | null) => {
            let timeMax: number | undefined;
            // 取最大值=> startOf('d');
            dateEndWith.map(dependence => {
                const date = dependence === 'now' ? dayjs() : form.getFieldValue(dependence);
                if (date) {
                    const time = date.endOf('day').valueOf();
                    if ((timeMax && time < timeMax) || timeMax === void 0) {
                        timeMax = time;
                    }
                }
            });
            if (!endTime || timeMax === void 0) {
                return false;
            }
            return timeMax < endTime.endOf('day').valueOf();
        };
    }, []);

    const disabledDate = useMemo(() => {
        return dateBeginWith
            ? disabledStartDate(dateBeginWith)
            : dateEndWith
            ? disabledEndDate(dateEndWith)
            : undefined;
    }, [dateBeginWith, dateEndWith]);

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, [onChange]);

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
                <DatePicker
                    className={formStyles.formItemDefault}
                    disabledDate={disabledDate}
                    {...eventProps}
                    {...(childrenProps as PickerProps<Dayjs>)}
                />
            </Form.Item>
        );
    }, [eventProps, childrenProps, formItemProps]);
};

FormDatePicker.typeList = typeList;

export default FormDatePicker;
