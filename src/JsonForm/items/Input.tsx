import { Form } from "antd";
import React, { useMemo } from "react";
import { CustomFormProps, FormItemName } from "../index";
import { FormInstance, Rule } from "antd/es/form";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { transNullValue, transNumber, transNumberStrArr, transStrArr } from "../utils";
import RichInput, { RichType } from "../../RichInput";
import { InputProps as AntInputProps } from "antd/es/input";
import formStyles from "../_form.less";

export type InputType = RichType;
const typeList = ["input", "integer", "number", "positiveInteger"];

export type InputFormatter = "number" | "strArr" | "numberStrArr";

export type InputProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: InputType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: InputFormatter;
        rules?: Rule[];
    } & Omit<AntInputProps, "type" | "size" | "onPressEnter" | "form" | "onChange">;

const FormInput = (props: InputProps) => {
    const {
        name,
        placeholder,
        label,
        className = formStyles.formItemDefault,
        formItemClassName,
        onChange,
        labelClassName,
        form,
        type,
        rules,
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

    return useMemo(() => {
        return (
            <Form.Item
                className={formItemClassName}
                name={name}
                label={<span className={labelClassName}>{label}</span>}
                rules={rules}
            >
                <RichInput
                    placeholder={placeholder}
                    className={className}
                    {..._props}
                    {...eventProps}
                    richType={type}
                />
            </Form.Item>
        );
    }, []);
};

FormInput.typeList = typeList;

FormInput.formatter = (formatter?: InputFormatter) => {
    // return formatter ? (formatter === 'number' ? transNumber : transNullValue) : transNullValue;
    // return
    switch (formatter) {
        case "number":
            return transNumber;
        case "strArr":
            return transStrArr;
        case "numberStrArr":
            return transNumberStrArr;
        default:
            return transNullValue;
    }
};

export default FormInput;
