/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { CascaderProps as AntdCascaderProps } from 'antd/es/cascader/index';
import { FormatterType } from '../../utils/formatter';
import { CascaderOptionType } from 'antd/es/cascader';
import { IOptionItem } from './Select';
export declare type CascaderType = 'cascader';
declare type OptionsPromise = () => Promise<IOptionItem[]>;
export declare type CascaderProps<T = string> = FormItemLabelProps & CustomFormProps & {
    type: CascaderType;
    form: FormInstance;
    optionList?: IOptionItem[] | OptionsPromise;
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
    options?: CascaderOptionType[];
} & Omit<AntdCascaderProps, 'loading' | 'onChange' | 'className' | 'options'>;
declare const FormCascader: {
    (props: CascaderProps<string>): JSX.Element;
    typeList: string[];
};
export default FormCascader;
