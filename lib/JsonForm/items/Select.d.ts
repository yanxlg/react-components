/// <reference types="react" />
import { CustomFormProps, FormItemName } from "../index";
import { FormInstance, Rule } from "antd/es/form";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { transNullValue } from "../utils";
export declare interface IOptionItem {
    name: string;
    value: string | number;
    [key: string]: any;
}
export declare type SelectFormatter = "number" | "joinStr";
declare type OptionsPromise = () => Promise<IOptionItem[]>;
export declare type SelectType = "select";
export declare type SelectProps<T = string> = FormItemLabelProps & CustomFormProps & {
    type: SelectType;
    form: FormInstance;
    placeholder?: string;
    optionList?: IOptionItem[] | OptionsPromise;
    syncDefaultOption?: IOptionItem;
    optionListDependence?: {
        name: FormItemName | FormItemName[];
        key: string;
    };
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    formatter?: SelectFormatter;
    rules?: Rule[];
    mode?: "multiple" | "tags";
    maxTagCount?: number;
    isShortcut?: boolean;
    disabled?: boolean;
};
declare const FormSelect: {
    (props: SelectProps<string>): JSX.Element;
    typeList: string[];
    formatter(formatter?: SelectFormatter): typeof transNullValue;
};
export default FormSelect;
