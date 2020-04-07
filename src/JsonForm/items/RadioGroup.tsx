import React, { useMemo } from "react";
import { Form, Radio } from "antd";
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio/interface";

export type RadioGroupType = "radioGroup";
const typeList = ["radioGroup"];

export type RadioGroupProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: RadioGroupType;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: undefined;
        rules?: Rule[];
        radioType?: "button" | "radio";
    } & Omit<AntdRadioGroupProps, "onChange">;

const FormRadioGroup = (props: RadioGroupProps) => {
    const {
        name,
        label,
        labelClassName,
        formItemClassName,
        className,
        onChange,
        form,
        rules,
        radioType = "radio",
        options,
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

    return (
        <Form.Item
            name={name}
            label={label ? <span className={labelClassName}>{label}</span> : undefined}
            className={formItemClassName}
            rules={rules}
        >
            <Radio.Group className={className} {...eventProps} {..._props}>
                {options.map(option => {
                    const { label, value } =
                        typeof option === "string" ? { label: option, value: option } : option;
                    if (radioType === "radio") {
                        return (
                            <Radio key={String(value)} value={value}>
                                {label}
                            </Radio>
                        );
                    } else {
                        return (
                            <Radio.Button key={String(value)} value={value}>
                                {label}
                            </Radio.Button>
                        );
                    }
                })}
            </Radio.Group>
        </Form.Item>
    );
};

FormRadioGroup.typeList = typeList;

export default FormRadioGroup;
