/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input';
import { FormatterType } from '../../utils/formatter';
export declare type TextAreaType = 'textarea';
export declare type TextAreaProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: TextAreaType;
    placeholder?: string;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    formatter?: FormatterType;
    rules?: Rule[];
} & Omit<AntTextAreaProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
declare const FormTextArea: {
    (props: TextAreaProps<string>): JSX.Element;
    typeList: string[];
};
export default FormTextArea;
