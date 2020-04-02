/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { transNullValue, transStrArr } from '../utils';
import { RichType } from '../../RichInput';
import { InputProps as AntInputProps } from 'antd/es/input';
export declare type InputType = RichType;
export declare type InputFormatter = 'number' | 'strArr' | 'numberStrArr';
export declare type InputProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: InputType;
    placeholder?: string;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    formatter?: InputFormatter;
    rules?: Rule[];
} & Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
declare const FormInput: {
    (props: InputProps<string>): JSX.Element;
    typeList: string[];
    formatter(formatter?: InputFormatter): typeof transStrArr | typeof transNullValue;
};
export default FormInput;
