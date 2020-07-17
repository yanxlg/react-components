import React from 'react';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { FormatterType } from '../../../utils/formatter';
import { NamePath } from 'rc-field-form/lib/interface';
import { InputProps as AntInputProps } from 'antd/es/input/Input';
export declare type NumberRangeType = 'numberRange@2';
export declare type NumberRangeProps = Omit<
    FormItemProps,
    'children' | 'rules' | 'initialValue' | 'name'
> & {
    form: FormInstance;
    type: NumberRangeType;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: [NamePath, NamePath];
    formatter?: FormatterType;
    precision?: number;
    labelClassName?: string;
    initialValue?: [any] | [any, any];
    childrenProps?: Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
    addonAfter?: React.ReactNode;
};
declare const FormInputRange: {
    (props: NumberRangeProps): JSX.Element;
    typeList: string[];
};
export default FormInputRange;
