/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { SelectProps as AntdSelectProps } from 'antd/es/select/index';
import { FormatterType } from '../../utils/formatter';
export declare interface IOptionItem {
    name: string;
    value: string | number;
    [key: string]: any;
}
declare type OptionsPromise = () => Promise<IOptionItem[]>;
export declare type SelectType = 'select';
export declare type SelectProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        type: SelectType;
        form: FormInstance;
        placeholder?: string;
        optionList?: IOptionItem[] | OptionsPromise;
        syncDefaultOption?: IOptionItem;
        optionListDependence?: {
            name: FormItemName | FormItemName[];
            key: string;
        };
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void;
        name: FormItemName<T>;
        formatter?: FormatterType;
        rules?: Rule[];
        isShortcut?: boolean;
    } & Omit<AntdSelectProps<string>, 'loading' | 'onChange' | 'className' | 'options'>;
declare const FormSelect: {
    (props: SelectProps<string>): JSX.Element;
    typeList: string[];
};
export default FormSelect;
