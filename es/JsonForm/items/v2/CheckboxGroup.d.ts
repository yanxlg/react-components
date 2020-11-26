/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/lib/checkbox/Group';
import { NamePath } from 'rc-field-form/lib/interface';
import { IHttpOptions, ISelector } from './Select';
import { CheckboxOptionType } from 'antd/es/checkbox';
export declare type CheckboxGroupType = 'checkboxGroup@2';
export declare type CheckboxGroupProps = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    type: CheckboxGroupType;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: NamePath;
    labelClassName?: string;
    options: CheckboxOptionType[] | IHttpOptions | ISelector;
    optionKeys?: [string, string];
    childrenProps?: Omit<AntdCheckboxGroupProps, 'onChange'>;
    showLoading?: boolean;
};
declare const FormCheckboxGroup: {
    (props: CheckboxGroupProps): JSX.Element;
    typeList: string[];
};
export default FormCheckboxGroup;
