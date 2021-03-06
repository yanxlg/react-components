/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
import { FormatterType } from '../../utils/formatter';
export declare type InputRangeType = 'inputRange';
export declare type InputRangeProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: InputRangeType;
        placeholder?: string;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        name: [FormItemName<T>, FormItemName];
        formatter?: FormatterType;
        precision?: number;
        rules?: [Rule[], Rule[]];
    };
declare const FormInputRange: {
    (props: InputRangeProps<string>): JSX.Element;
    typeList: string[];
};
export default FormInputRange;
