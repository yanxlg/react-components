/// <reference types="react" />
import { FormField } from '../index';
import { FormInstance } from 'antd/es/form';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
export declare type LoadingType = 'loading';
export declare interface LoadingItemProps<T = string> {
    type: LoadingType;
    form: FormInstance;
    loading: (form: FormInstance) => Promise<FormField>;
    itemCol?: ColProps;
    itemRow?: RowProps;
    placeholder: {
        label: string;
        labelClassName?: string;
        formItemClassName?: string;
        colon?: boolean;
    };
}
declare const LoadingItem: {
    ({
        placeholder: { label, labelClassName, formItemClassName, colon },
        loading,
        form,
        itemCol,
        itemRow,
    }: LoadingItemProps<string>): JSX.Element;
    typeList: string[];
};
export default LoadingItem;
