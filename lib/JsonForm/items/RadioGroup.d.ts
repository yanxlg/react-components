/// <reference types="react" />
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio/interface";
export declare type RadioGroupType = "radioGroup";
export declare type RadioGroupProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: RadioGroupType;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        name: FormItemName<T>;
        formatter?: undefined;
        rules?: Rule[];
        radioType?: "button" | "radio";
    } & Omit<AntdRadioGroupProps, "onChange">;
declare const FormRadioGroup: {
    (props: RadioGroupProps<string>): JSX.Element;
    typeList: string[];
};
export default FormRadioGroup;
