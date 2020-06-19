/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { InputProps as AntInputProps } from 'antd/es/input';
import { FormatterType } from '../../utils/formatter';
export declare type NumberRangeType = 'inputRange' | 'integerRange' | 'numberRange' | 'positiveIntegerRange';
export declare type NumberRangeProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: NumberRangeType;
    placeholder?: string;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: [FormItemName<T>, FormItemName<T>];
    formatter?: FormatterType;
    rules?: Rule[];
    labelClassName?: string;
    initialValue?: any;
} & Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
declare const FormNumberRange: {
    (props: NumberRangeProps<string>): JSX.Element;
    typeList: string[];
};
export default FormNumberRange;
