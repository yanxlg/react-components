/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { SelectProps as AntdSelectProps } from 'antd/es/select/index';
import { TreeSelectProps } from 'antd/es/tree-select';
import { NamePath } from 'rc-field-form/lib/interface';
import { FormatterType } from '../../../utils/formatter';
export declare type SelectType = 'select@2';
export interface ISelector {
    selector: (state: any) => unknown;
    equalityFn?: (left: unknown, right: unknown) => boolean;
}
interface IHttpOptions {
    url: string;
    request?: {
        get: (url: string) => Promise<any>;
        [key: string]: any;
    };
    dataPath?: NamePath;
    parser?: 'object' | 'array';
}
export interface IOptionItem {
    label: string;
    value: any;
    disabled?: boolean;
    [key: string]: any;
}
declare type SelectComponentProps = Omit<AntdSelectProps<string>, 'loading' | 'onChange' | 'options'> & {
    mode?: Exclude<'tags' | 'multiple', AntdSelectProps<string>['mode']>;
};
declare type MultipleSelectProps = Omit<TreeSelectProps<string>, 'loading' | 'onChange' | 'treeData'> & {
    mode: 'tags' | 'multiple';
};
export declare type SelectProps = Omit<FormItemProps, 'children'> & {
    type: SelectType;
    form: FormInstance;
    defaultOption?: {
        label: string;
        value?: any;
    } | true;
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string | false;
    options: IOptionItem[] | IHttpOptions | ISelector;
    optionKeys?: [string, string];
    relation?: {
        name: NamePath;
        key?: string;
    };
    onChange?: (name: NamePath, form: FormInstance) => void;
    childrenProps?: SelectComponentProps | MultipleSelectProps;
};
declare const FormSelect: {
    (props: SelectProps): JSX.Element;
    typeList: string[];
};
export default FormSelect;
