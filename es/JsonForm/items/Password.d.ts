import React from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { PasswordProps } from 'antd/es/input';
export declare type PasswordType = 'password';
export declare type FormPasswordProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: PasswordType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        name: FormItemName<T>;
        rules?: Rule[];
        labelClassName?: string;
        initialValue?: any;
        defaultVisible?: boolean;
        validateTrigger?: string | string[];
    } & Omit<PasswordProps, 'type' | 'size' | 'form' | 'onChange'>;
declare const FormPassword: {
    (props: FormPasswordProps<string>): JSX.Element;
    defaultProps: {
        iconRender: (
            visible: boolean,
        ) => React.FunctionComponentElement<
            import('@ant-design/icons/lib/components/AntdIcon').AntdIconProps &
                React.RefAttributes<HTMLSpanElement>
        >;
    };
    typeList: string[];
};
export default FormPassword;
