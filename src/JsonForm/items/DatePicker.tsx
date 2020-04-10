import { DatePicker, Form } from "antd";
import React, { useCallback, useMemo } from "react";
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import dayjs, { Dayjs } from "dayjs";
import { transNullValue } from "../utils";
import formStyles from "../_form.less";
import { PickerDateProps } from "antd/es/date-picker/generatePicker";
import { startDateToUnix, endDateToUnix } from "../../utils/date";

export type DatePickerFormatter = "start_date" | "end_date";

export type DatePickerType = "datePicker";
const typeList = ["datePicker"];

export type DatePickerProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        name: FormItemName<T>;
        form: FormInstance;
        type: DatePickerType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        dateBeginWith?: Array<FormItemName<T> | "now">;
        dateEndWith?: Array<FormItemName<T> | "now">;
        formatter?: DatePickerFormatter;
        rules?: Rule[];
    } & Omit<PickerDateProps<Dayjs>, "onChange">;

const FormDatePicker = (props: DatePickerProps) => {
    const {
        name,
        placeholder,
        label,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        dateBeginWith,
        dateEndWith,
        onChange,
        labelClassName,
        form,
        rules,
        picker,
        ..._props
    } = props;

    const disabledStartDate = useCallback((dateBeginWith?: string[]) => {
        if (!dateBeginWith || dateBeginWith.length === 0) {
            return undefined;
        }
        return (startTime: Dayjs | null) => {
            let timeMax: number | undefined = undefined;
            // 取最小值=> endOf('d');
            dateBeginWith.map(dependence => {
                const date = dependence === "now" ? dayjs() : form.getFieldValue(dependence);
                if (date) {
                    const time = date.startOf("day").valueOf();
                    if ((timeMax && time < timeMax) || timeMax === void 0) {
                        timeMax = time;
                    }
                }
            });
            if (!startTime || timeMax === void 0) {
                return false;
            }
            return startTime.startOf("day").valueOf() < timeMax;
        };
    }, []);

    const disabledEndDate = useCallback((dateEndWith?: string[]) => {
        if (!dateEndWith || dateEndWith.length === 0) {
            return undefined;
        }
        return (endTime: Dayjs | null) => {
            let timeMax: number | undefined = undefined;
            // 取最大值=> startOf('d');
            dateEndWith.map(dependence => {
                const date = dependence === "now" ? dayjs() : form.getFieldValue(dependence);
                if (date) {
                    const time = date.endOf("day").valueOf();
                    if ((timeMax && time < timeMax) || timeMax === void 0) {
                        timeMax = time;
                    }
                }
            });
            if (!endTime || timeMax === void 0) {
                return false;
            }
            return timeMax < endTime.endOf("day").valueOf();
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
    }, []);

    return (
        <Form.Item
            name={name}
            className={formItemClassName}
            label={<span className={labelClassName}>{label}</span>}
            rules={rules}
        >
            <DatePicker
                className={className}
                placeholder={placeholder}
                disabledDate={disabledDate}
                {...eventProps}
                {..._props}
            />
        </Form.Item>
    );
};

FormDatePicker.typeList = typeList;

FormDatePicker.formatter = (formatter?: DatePickerFormatter) => {
    return formatter
        ? formatter === "start_date"
            ? startDateToUnix
            : formatter === "end_date"
            ? endDateToUnix
            : transNullValue
        : transNullValue;
};

export default FormDatePicker;
