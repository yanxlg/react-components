/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
import { FormatterType } from '../../utils/formatter';
export declare type DateRangerType = 'dateRanger';
export declare type DateRangerProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: DateRangerType;
    placeholder?: string;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: [FormItemName<T>, FormItemName<T>];
    formatter?: [FormatterType, FormatterType];
    rules?: [Rule[], Rule[]];
};
declare const FormDateRanger: {
    (props: DateRangerProps<string>): JSX.Element;
    typeList: string[];
};
export default FormDateRanger;
