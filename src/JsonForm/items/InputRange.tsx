import React, { useMemo } from "react";
import { Form, InputNumber } from "antd";
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import formStyles from "../_form.less";
import { transNumber } from "../utils";

export type InputRangeType = "inputRange";
const typeList = ["inputRange"];

export type InputRangeProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: InputRangeType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: [FormItemName<T>, FormItemName];
        formatter?: any;
        precision?: number;
        rules?: [Rule[], Rule[]];
    };

const FormInputRange = (props: InputRangeProps) => {
    const {
        label,
        className,
        name: [name1, name2],
        formItemClassName,
        onChange,
        labelClassName = "",
        form,
        precision = 0,
        rules = [
            [
                ({ getFieldValue, validateFields }) => ({
                    validator(rule, value) {
                        // 校验最大值
                        validateFields([name2]);
                        return Promise.resolve();
                    },
                }),
            ] as Rule[],
            [
                ({ getFieldValue, validateFields }) => ({
                    validator(rule, value) {
                        const value1 = getFieldValue(name1);
                        if (
                            typeof value !== "number" ||
                            typeof value1 !== "number" ||
                            value >= value1
                        ) {
                            // validateFields([name1]);
                            return Promise.resolve();
                        }
                        return Promise.reject("请检查范围区间!");
                    },
                }),
            ] as Rule[],
        ],
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
        const itemClassName = [
            formStyles.inlineBlock,
            formStyles.marginNone,
            formStyles.verticalMiddle,
        ].join(" ");
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
                    <Form.Item
                        name={name1}
                        className={formStyles.marginNone}
                        validateTrigger="onBlur"
                        rules={rules?.[0]}
                    >
                        <InputNumber
                            min={0}
                            precision={precision}
                            className={className}
                            {...event1Props}
                        />
                    </Form.Item>
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
                    <Form.Item
                        name={name2}
                        className={formStyles.marginNone}
                        validateTrigger="onBlur"
                        rules={rules?.[1]}
                    >
                        <InputNumber
                            min={0}
                            precision={precision}
                            className={className}
                            {...event2Props}
                        />
                    </Form.Item>
                </Form.Item>
            </Form.Item>
        );
    }, []);
};

FormInputRange.typeList = typeList;

FormInputRange.formatter = () => {
    return transNumber;
};

export default FormInputRange;
