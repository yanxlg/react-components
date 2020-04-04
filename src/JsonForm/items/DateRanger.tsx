import { DatePicker, Form } from "antd";
import React, { useMemo } from "react";
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { transNullValue, transEndDate, transStartDate } from "../utils";
import formStyles from "../_form.less";
import classNames from "classnames";

export type DateRangerFormatter = "start_date" | "end_date";

export type DateRangerType = "dateRanger";
const typeList = ["dateRanger"];

export type DateRangerProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: DateRangerType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: [FormItemName<T>, FormItemName<T>];
        formatter?: [DateRangerFormatter, DateRangerFormatter];
        rules?: [Rule[], Rule[]];
    };

const FormDateRanger = (props: DateRangerProps) => {
    const {
        label,
        className,
        name: [name1, name2],
        formItemClassName,
        onChange,
        labelClassName = "",
        form,
        rules,
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
                label={<span className={labelClassName}>{label}</span>}
                className={`${formItemClassName}`}
            >
                <Form.Item
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues[name2] !== currentValues[name2]
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
                            >
                                <DatePicker
                                    disabledDate={currentDate =>
                                        currentDate
                                            ? endTime
                                                ? currentDate.isAfter(endTime)
                                                : false
                                            : false
                                    }
                                    className={className}
                                    {...event1Props}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
                <span className={[formStyles.formColon, formStyles.verticalMiddle].join(" ")}>
                    -
                </span>
                <Form.Item
                    className={itemClassName}
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues[name1] !== currentValues[name1]
                    }
                >
                    {({ getFieldValue }) => {
                        const startTime = getFieldValue(name1);
                        return (
                            <Form.Item
                                name={name2}
                                className={formStyles.marginNone}
                                rules={rules?.[1]}
                            >
                                <DatePicker
                                    disabledDate={currentDate =>
                                        currentDate
                                            ? startTime
                                                ? currentDate.isBefore(startTime)
                                                : false
                                            : false
                                    }
                                    className={className}
                                    {...event2Props}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Form.Item>
        );
    }, []);
};

FormDateRanger.typeList = typeList;

FormDateRanger.formatter = (formatter?: DateRangerFormatter) => {
    return formatter
        ? formatter === "start_date"
            ? transStartDate
            : formatter === "end_date"
            ? transEndDate
            : transNullValue
        : transNullValue;
};
export default FormDateRanger;
