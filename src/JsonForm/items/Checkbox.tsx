import React, { useMemo } from "react";
import { Checkbox, Form } from "antd";
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { CheckboxProps as AntdCheckboxProps } from "antd/es/checkbox/Checkbox";
import formStyles from "../_form.less";

export type CheckboxType = "checkbox";
const typeList = ["checkbox"];

export type CheckboxProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: CheckboxType;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: undefined;
        rules?: Rule[];
    } & Omit<AntdCheckboxProps, "onChange" | "name">;

const FormCheckbox = (props: CheckboxProps) => {
    const {
        name,
        label,
        formItemClassName = formStyles.formItem,
        className,
        onChange,
        form,
        rules,
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
        <Form.Item name={name} className={formItemClassName} valuePropName="checked" rules={rules}>
            <Checkbox className={className} {...eventProps}>
                {label}
            </Checkbox>
        </Form.Item>
    );
};

FormCheckbox.typeList = typeList;

export default FormCheckbox;
