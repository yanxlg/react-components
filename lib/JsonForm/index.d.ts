import React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import { InputProps } from './items/Input';
import { SelectProps } from './items/Select';
import { CheckboxProps } from './items/Checkbox';
import { DatePickerProps } from './items/DatePicker';
import { DateRangerProps } from './items/DateRanger';
import { InputRangeProps } from './items/InputRange';
import { Store, ValidateFields } from 'rc-field-form/lib/interface';
import { FormInstance } from 'antd/es/form';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CheckboxGroupProps } from './items/CheckboxGroup';
import { RadioGroupProps } from './items/RadioGroup';
import './index.less';
import { LayoutProps } from './layout';
import { DynamicItemProps } from './items/DynamicItem';
import { HideItemProps } from './items/HideItem';
import { TextAreaProps } from './items/TextArea';
import { CascaderProps } from './items/Cascader';
import { CustomFragmentProps } from './items/CustomFragment';
import { TreeSelectProps } from './items/TreeSelect';
import { LoadingItemProps } from './items/LoadingItem';
import { NumberRangeProps } from './items/NumberRange';
import { FormTreeProps } from './items/TreeItem';
import { CollapseLayoutProps } from './layout/CollapseLayout';
import { FormPasswordProps } from './items/Password';
import { LabelProps } from './items/Label';
import { NamePath } from 'rc-field-form/es/interface';
import { SelectProps as SelectPropsV2 } from './items/v2/Select';
import { InputProps as InputPropsV2 } from './items/v2/Input';
import { CheckboxGroupProps as CheckboxGroupPropsV2 } from './items/v2/CheckboxGroup';
import { DateRangerProps as DateRangerPropsV2 } from './items/v2/DateRanger';
export declare interface CustomFormProps {
    labelClassName?: string;
}
export declare type FormField<T = string> = (Omit<InputProps<T>, 'form'> | Omit<LabelProps<T>, 'form'> | Omit<FormPasswordProps<T>, 'form'> | Omit<SelectProps<T>, 'form'> | Omit<CheckboxProps<T>, 'form'> | Omit<DatePickerProps<T>, 'form'> | Omit<DateRangerProps<T>, 'form'> | Omit<CheckboxGroupProps<T>, 'form'> | Omit<RadioGroupProps<T>, 'form'> | Omit<InputRangeProps<T>, 'form'> | Omit<TextAreaProps<T>, 'form'> | Omit<LayoutProps<T>, 'form' | 'labelClassName' | 'itemCol' | 'itemRow'> | Omit<CollapseLayoutProps<T>, 'form' | 'labelClassName' | 'itemCol' | 'itemRow'> | Omit<DynamicItemProps, 'form' | 'labelClassName' | 'itemCol' | 'itemRow'> | Omit<HideItemProps, 'form'> | Omit<CascaderProps, 'form'> | Omit<CustomFragmentProps, 'form'> | Omit<TreeSelectProps<T>, 'form'> | Omit<LoadingItemProps<T>, 'form'> | Omit<NumberRangeProps<T>, 'form'> | Omit<FormTreeProps<T>, 'form'> | Omit<SelectPropsV2, 'form'> | Omit<InputPropsV2, 'form'> | Omit<CheckboxGroupPropsV2, 'form'> | Omit<DateRangerPropsV2, 'form'>) & {
    form?: FormInstance;
    key?: string;
};
declare interface JsonFormProps<T = any> extends FormProps, CustomFormProps {
    fieldList: Array<FormField<T>>;
    defaultCollapse?: boolean;
    itemCol?: ColProps;
    itemRow?: RowProps;
    containerClassName?: string;
    collapseItems?: string[];
}
export declare type FormItemName<T = string> = T;
export declare interface CustomFormProps {
    labelClassName?: string;
}
export interface JsonFormRef {
    getFieldsValue: () => Store;
    validateFields: ValidateFields;
    setFieldsValue: (value: Store) => void;
    resetFields: (fields?: NamePath[]) => void;
}
export declare const getColChildren: (children: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>, itemCol?: ColProps, times?: number) => JSX.Element;
export declare const getFormItem: ({ type, ...field }: FormField<string>, form: FormInstance, labelClassName?: string, itemCol?: ColProps, itemRow?: RowProps, index?: number, hide?: boolean) => JSX.Element;
export declare const getFormItems: (fieldList: FormField<string>[], form: FormInstance, labelClassName?: string, itemCol?: ColProps, itemRow?: RowProps, showList?: string[]) => JSX.Element | JSX.Element[];
declare const _default_1: React.ForwardRefExoticComponent<JsonFormProps<any> & React.RefAttributes<JsonFormRef>>;
export default _default_1;
