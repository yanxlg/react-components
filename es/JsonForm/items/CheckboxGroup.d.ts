/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/lib/checkbox/Group';
export declare type CheckboxGroupType = 'checkboxGroup';
export declare type CheckboxGroupProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: CheckboxGroupType;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        name: FormItemName<T>;
        rules?: Rule[];
    } & Omit<AntdCheckboxGroupProps, 'onChange'>;
declare const FormCheckboxGroup: {
    (props: CheckboxGroupProps<string>): JSX.Element;
    typeList: string[];
};
export default FormCheckboxGroup;
