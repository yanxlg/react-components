/// <reference types="react" />
import { DvaSelector, IOptionItem } from './Select';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormatterType } from '../../utils/formatter';
import { TreeSelectProps as AntdTreeSelectProps } from 'antd/es/tree-select';
export declare type TreeSelectType = 'treeSelect';
declare type OptionsPromise = () => Promise<IOptionItem[]>;
export declare type TreeSelectProps<T = string> = FormItemLabelProps & CustomFormProps & {
    type: TreeSelectType;
    form: FormInstance;
    optionList?: IOptionItem[] | OptionsPromise | DvaSelector;
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
    labelClassName?: string;
    initialValue?: any;
    hide?: boolean;
} & Omit<AntdTreeSelectProps<string>, 'loading' | 'onChange' | 'className'>;
declare const FormTreeSelect: {
    (props: TreeSelectProps<string>): JSX.Element;
    typeList: string[];
};
export default FormTreeSelect;
