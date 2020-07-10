/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { CascaderProps as AntdCascaderProps } from 'antd/es/cascader/index';
import { FormatterType } from '../../utils/formatter';
export declare type CascaderType = 'cascader';
export declare type CascaderProps<T = string> = FormItemLabelProps & CustomFormProps & {
    type: CascaderType;
    form: FormInstance;
    placeholder?: string;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    formatter?: FormatterType;
    rules?: Rule[];
    labelClassName?: string;
    initialValue?: any;
    hide?: boolean;
} & Omit<AntdCascaderProps, 'loading' | 'onChange' | 'className'>;
declare const FormCascader: {
    (props: CascaderProps<string>): JSX.Element;
    typeList: string[];
};
export default FormCascader;
