/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { FormItemName } from '../../index';
import { NamePath } from 'rc-field-form/lib/interface';
import { CascaderOptionType, CascaderProps as AntdCascaderProps } from 'antd/lib/cascader';
export declare type CascaderType = 'cascader@2';
export declare type CascaderProps<T = string> = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    type: CascaderType;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: NamePath;
    labelClassName?: string;
    childrenProps?: Omit<AntdCascaderProps, 'onChange' | 'options'> & {
        options: CascaderOptionType[];
        service?: () => Promise<any>;
        dataPath?: string | null;
    };
};
declare const FormCascader: {
    (props: CascaderProps): JSX.Element;
    typeList: string[];
};
export default FormCascader;
