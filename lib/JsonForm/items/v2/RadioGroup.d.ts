/// <reference types="react" />
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio/interface';
import { NamePath } from 'rc-field-form/lib/interface';
export declare type RadioGroupType = 'radioGroup@2';
export declare type RadioGroupProps<T = string> = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    type: RadioGroupType;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: NamePath;
    formatter?: undefined;
    labelClassName?: string;
    childrenProps?: Omit<AntdRadioGroupProps, 'onChange'>;
};
declare const FormRadioGroup: {
    (props: RadioGroupProps): JSX.Element;
    typeList: string[];
};
export default FormRadioGroup;
