/// <reference types="react" />
import { CustomFormProps, FormItemName } from '../index';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormInstance, Rule } from 'antd/es/form';
import { TreeProps } from 'antd/es/tree';
export declare type FormTreeType = 'tree';
export declare type FormTreeProps<T = string> = FormItemLabelProps & CustomFormProps & {
    form: FormInstance;
    type: FormTreeType;
    className?: string;
    formItemClassName?: string;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void;
    name: FormItemName<T>;
    rules?: Rule[];
    labelClassName?: string;
    required?: boolean;
    initialValue?: any;
    hide?: boolean;
} & TreeProps;
declare const FormTree: {
    (props: FormTreeProps<string>): JSX.Element;
    typeList: string[];
};
export default FormTree;
