/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { InputProps as AntInputProps } from 'antd/es/input';
import { FormatterType } from '../../../utils/formatter';
import { NamePath } from 'rc-field-form/lib/interface';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input/TextArea';
export declare type InputTypeAll = InputType | TextareaType;
declare type InputType = 'input@2' | 'integer@2' | 'number@2' | 'positiveInteger@2' | 'numberSplit@2' | 'naturalNumber@2';
declare type TextareaType = 'textarea@2';
declare type InputTypeProp = {
    type: InputType;
    childrenProps?: Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
};
declare type TextareaTypeProp = {
    type: TextareaType;
    childrenProps?: Omit<AntTextAreaProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
};
export declare type InputProps = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string;
} & (InputTypeProp | TextareaTypeProp);
declare const FormInput: {
    (props: InputProps): JSX.Element;
    typeList: string[];
};
export default FormInput;
