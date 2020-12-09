import React from 'react';
import { CustomFormProps } from '../index';
import { FormInstance } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { InputProps as AntInputProps } from 'antd/es/input';
export declare type LabelType = 'label';
export declare type LabelProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: LabelType;
    className?: string;
    formItemClassName?: string;
    labelClassName?: string;
    hide?: boolean;
    content: React.ReactNode;
} & Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
declare const FormLabel: {
    (props: LabelProps): JSX.Element;
    typeList: string[];
};
export default FormLabel;
