/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { PasswordProps } from 'antd/es/input';
import { NamePath } from 'rc-field-form/lib/interface';
import { FormatterType } from '../../../utils/formatter';
export declare type PasswordType = 'password@2';
export declare type FormPasswordProps<T = string> = Omit<FormItemProps, 'children'> & {
    type: PasswordType;
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string;
    defaultVisible?: boolean;
    childrenProps?: Omit<PasswordProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
};
declare const FormPassword: {
    (props: FormPasswordProps<T>): JSX.Element;
    typeList: string[];
};
export default FormPassword;
