/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
export declare type CheckboxType = 'checkbox';
export declare type CheckboxProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: CheckboxType;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    formatter?: undefined;
    rules?: Rule[];
};
declare const FormCheckbox: {
    (props: CheckboxProps<string>): JSX.Element;
    typeList: string[];
};
export default FormCheckbox;
