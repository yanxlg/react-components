/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { CascaderProps as AntdCascaderProps } from 'antd/es/cascader/index';
import { FormatterType } from '../../utils/formatter';
import { CascaderOptionType } from 'antd/es/cascader';
export declare type CascaderType = 'cascader';
export declare type CascaderProps<T = string> = FormItemLabelProps & CustomFormProps & {
    type: CascaderType;
    form: FormInstance;
    placeholder?: string;
    optionList?: CascaderOptionType[];
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    formatter?: FormatterType;
    rules?: Rule[];
} & Omit<AntdCascaderProps, 'loading' | 'onChange' | 'className' | 'options'>;
declare const FormCascader: {
    (props: CascaderProps<string>): JSX.Element;
    typeList: string[];
};
export default FormCascader;
