/// <reference types="react" />
import { CustomFormProps, FormItemName } from "../index";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { Moment } from "moment";
import { transNullValue, transStartDate } from "../utils";
import { PickerProps } from "antd/es/date-picker/generatePicker";
export declare type DatePickerFormatter = "start_date" | "end_date";
export declare type DatePickerType = "datePicker";
export declare type DatePickerProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        name: FormItemName<T>;
        form: FormInstance;
        type: DatePickerType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        dateBeginWith?: Array<FormItemName<T> | "now">;
        dateEndWith?: Array<FormItemName<T> | "now">;
        formatter?: DatePickerFormatter;
        rules?: Rule[];
    } & Omit<PickerProps<Moment>, "onChange">;
declare const FormDatePicker: {
    (props: DatePickerProps<string>): JSX.Element;
    typeList: string[];
    formatter(formatter?: DatePickerFormatter): typeof transNullValue | typeof transStartDate;
};
export default FormDatePicker;
