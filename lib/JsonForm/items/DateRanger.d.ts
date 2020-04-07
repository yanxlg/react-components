/// <reference types="react" />
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { transNullValue, transStartDate } from "../utils";
export declare type DateRangerFormatter = "start_date" | "end_date";
export declare type DateRangerType = "dateRanger";
export declare type DateRangerProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: DateRangerType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        name: [FormItemName<T>, FormItemName<T>];
        formatter?: [DateRangerFormatter, DateRangerFormatter];
        rules?: [Rule[], Rule[]];
    };
declare const FormDateRanger: {
    (props: DateRangerProps<string>): JSX.Element;
    typeList: string[];
    formatter(
        formatter?: import("./DatePicker").DatePickerFormatter,
    ): typeof transNullValue | typeof transStartDate;
};
export default FormDateRanger;
