import React, {
    forwardRef,
    ForwardRefRenderFunction,
    ReactElement,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Button, Col, Form, Row } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import FormInput, { InputType, InputProps } from './items/Input';
import FormSelect, { SelectType, SelectProps } from './items/Select';
import FormCheckbox, { CheckboxType, CheckboxProps } from './items/Checkbox';
import FormDatePicker, { DatePickerProps, DatePickerType } from './items/DatePicker';
import FormDateRanger, { DateRangerType, DateRangerProps } from './items/DateRanger';
import FormInputRange, { InputRangeType, InputRangeProps } from './items/InputRange';
import { Store, ValidateFields } from 'rc-field-form/lib/interface';
import { FormInstance } from 'antd/es/form';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import FormCheckboxGroup, { CheckboxGroupProps, CheckboxGroupType } from './items/CheckboxGroup';
import FormRadioGroup, { RadioGroupProps, RadioGroupType } from './items/RadioGroup';
import classNames from 'classnames';

import './index.less';
import formStyles from './_form.less';
import Layout, { LayoutType, LayoutProps } from './layout';
import DynamicItem, { DynamicItemProps, DynamicType } from './items/DynamicItem';
import HideItem, { HideItemProps, HideType } from './items/HideItem';
import formatter, { FormatterType } from '../utils/formatter';
import FormTextArea, { TextAreaProps, TextAreaType } from './items/TextArea';
import FormCascader, { CascaderProps, CascaderType } from './items/Cascader';
import CustomFragment, { CustomFragmentProps, CustomFragmentType } from './items/CustomFragment';
import FormTreeSelect, { TreeSelectType, TreeSelectProps } from './items/TreeSelect';
import LoadingItem, { LoadingItemProps, LoadingType } from './items/LoadingItem';
import FormNumberRange, { NumberRangeType, NumberRangeProps } from './items/NumberRange';
import FormTree, { FormTreeProps, FormTreeType } from './items/TreeItem';
import CollapseLayout, { CollapseLayoutProps, CollapseLayoutType } from './layout/CollapseLayout';

// normalize 可以实现formatter, 即可避免使用ref=>后期实现转换
export declare interface CustomFormProps {
    labelClassName?: string;
}

export type FormField<T = string> = (
    | Omit<InputProps<T>, 'form'>
    | Omit<SelectProps<T>, 'form'>
    | Omit<CheckboxProps<T>, 'form'>
    | Omit<DatePickerProps<T>, 'form'>
    | Omit<DateRangerProps<T>, 'form'>
    | Omit<CheckboxGroupProps<T>, 'form'>
    | Omit<RadioGroupProps<T>, 'form'>
    | Omit<InputRangeProps<T>, 'form'>
    | Omit<TextAreaProps<T>, 'form'>
    | Omit<LayoutProps<T>, 'form' | 'labelClassName' | 'itemCol' | 'itemRow'>
    | Omit<CollapseLayoutProps<T>, 'form' | 'labelClassName' | 'itemCol' | 'itemRow'>
    | Omit<DynamicItemProps, 'form' | 'labelClassName' | 'itemCol' | 'itemRow'>
    | Omit<HideItemProps, 'form'>
    | Omit<CascaderProps, 'form'>
    | Omit<CustomFragmentProps, 'form'>
    | Omit<TreeSelectProps<T>, 'form'>
    | Omit<LoadingItemProps<T>, 'form'>
    | Omit<NumberRangeProps<T>, 'form'>
    | Omit<FormTreeProps<T>, 'form'>
) & {
    form?: FormInstance;
    key?: string;
};

declare interface JsonFormProps<T = any> extends FormProps, CustomFormProps {
    fieldList: Array<FormField<T>>;
    defaultCollapse?: boolean; // 初始状态，默认为true
    itemCol?: ColProps;
    itemRow?: RowProps;
    containerClassName?: string;
    collapseItems?: string[];
}

export type FormItemName<T = string> = T;

export declare interface CustomFormProps {
    labelClassName?: string;
}

export interface JsonFormRef {
    getFieldsValue: () => Store;
    validateFields: ValidateFields;
    setFieldsValue: (value: Store) => void;
    resetFields: () => void;
}

export const getColChildren = (children: ReactElement, itemCol?: ColProps, times: number = 1) => {
    if (itemCol) {
        return <Col {...itemCol}>{children}</Col>;
    } else {
        return children;
    }
};

export const getFormItem = (
    { type, ...field }: FormField,
    form: FormInstance,
    labelClassName?: string,
    itemCol?: ColProps,
    itemRow?: RowProps,
    index?: number,
    hide?: boolean,
) => {
    const name = field['name'];
    if (FormInput.typeList.includes(type)) {
        return getColChildren(
            <FormInput
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as InputProps)}
                type={type as InputType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormSelect.typeList.includes(type)) {
        return getColChildren(
            <FormSelect
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as SelectProps)}
                type={type as SelectType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormCheckbox.typeList.includes(type)) {
        return getColChildren(
            <FormCheckbox
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as CheckboxProps)}
                type={type as CheckboxType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormDatePicker.typeList.includes(type)) {
        return getColChildren(
            <FormDatePicker
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as DatePickerProps)}
                type={type as DatePickerType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormDateRanger.typeList.includes(type)) {
        return getColChildren(
            <FormDateRanger
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as DateRangerProps)}
                type={type as DateRangerType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormCheckboxGroup.typeList.includes(type)) {
        return getColChildren(
            <FormCheckboxGroup
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as CheckboxGroupProps)}
                type={type as CheckboxGroupType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormRadioGroup.typeList.includes(type)) {
        return getColChildren(
            <FormRadioGroup
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as RadioGroupProps)}
                type={type as RadioGroupType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormInputRange.typeList.includes(type)) {
        return (
            <FormInputRange
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as InputRangeProps)}
                type={type as InputRangeType}
                form={form}
                hide={hide}
            />
        );
    }
    if (Layout.typeList.includes(type)) {
        return getColChildren(
            <Layout
                key={String(index)}
                labelClassName={labelClassName}
                {...(field as LayoutProps)}
                type={type as LayoutType}
                form={form}
                itemRow={itemRow}
                itemCol={itemCol}
            />,
            itemCol,
        );
    }
    if (DynamicItem.typeList.includes(type)) {
        return getColChildren(
            <DynamicItem
                key={String(index)}
                labelClassName={labelClassName}
                {...(field as DynamicItemProps)}
                type={type as DynamicType}
                form={form}
                itemRow={itemRow}
                itemCol={itemCol}
            />,
            itemCol,
        );
    }
    if (HideItem.typeList.includes(type)) {
        return (
            <HideItem
                key={String(index)}
                {...(field as HideItemProps)}
                type={type as HideType}
                form={form}
            />
        );
    }
    if (FormTextArea.typeList.includes(type)) {
        return (
            <FormTextArea
                key={String(index)}
                labelClassName={labelClassName}
                {...(field as TextAreaProps)}
                type={type as TextAreaType}
                form={form}
                hide={hide}
            />
        );
    }
    if (FormCascader.typeList.includes(type)) {
        return (
            <FormCascader
                key={String(index)}
                labelClassName={labelClassName}
                {...(field as CascaderProps)}
                type={type as CascaderType}
                form={form}
                hide={hide}
            />
        );
    }
    if (CustomFragment.typeList.includes(type)) {
        return (
            <CustomFragment
                key={String(index)}
                {...(field as CustomFragmentProps)}
                type={type as CustomFragmentType}
                form={form}
            />
        );
    }
    if (FormTreeSelect.typeList.includes(type)) {
        return getColChildren(
            <FormTreeSelect
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as TreeSelectProps)}
                type={type as TreeSelectType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (LoadingItem.typeList.includes(type)) {
        return getColChildren(
            <LoadingItem
                key={String(name)}
                {...(field as LoadingItemProps)}
                {...Object.assign({}, (field as LoadingItemProps).placeholder, {
                    labelClassName:
                        (field as LoadingItemProps).placeholder.labelClassName || labelClassName,
                })}
                type={type as LoadingType}
                form={form}
            />,
            itemCol,
        );
    }
    if (FormNumberRange.typeList.includes(type)) {
        return getColChildren(
            <FormNumberRange
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as NumberRangeProps)}
                type={type as NumberRangeType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (FormTree.typeList.includes(type)) {
        return getColChildren(
            <FormTree
                key={String(name)}
                labelClassName={labelClassName}
                {...(field as FormTreeProps)}
                type={type as FormTreeType}
                form={form}
                hide={hide}
            />,
            itemCol,
        );
    }
    if (CollapseLayout.typeList.includes(type)) {
        return getColChildren(
            <CollapseLayout
                key={String(index)}
                labelClassName={labelClassName}
                {...(field as CollapseLayoutProps)}
                type={type as CollapseLayoutType}
                form={form}
                itemRow={itemRow}
                itemCol={itemCol}
            />,
            itemCol,
        );
    }
    return null;
};

export const getFormItems = (
    fieldList: Array<FormField>,
    form: FormInstance,
    labelClassName?: string,
    itemCol?: ColProps,
    itemRow?: RowProps,
    showList?: string[],
) => {
    const fields = fieldList.map((field, index) => {
        const name = field['name']; // undefined | string | string[];
        const hide =
            showList === void 0
                ? false
                : typeof name == 'string'
                ? showList.indexOf(name) === -1
                : Array.isArray(name)
                ? showList.indexOf(name.join(',')) === -1
                : false;
        return getFormItem(field, form, labelClassName, itemCol, itemRow, index, hide);
    });

    if (itemCol) {
        return (
            <Row {...(itemRow ? itemRow : {})} className={formStyles.formRow}>
                {fields}
            </Row>
        );
    } else {
        return fields;
    }
};

const getFormatterFunc = (formatterName: FormatterType, defaultFormatter?: any) => {
    const _default = (value: any) => value;
    return (
        (typeof formatterName === 'string' || formatterName === void 0
            ? formatter[formatterName as string] || defaultFormatter || _default
            : formatterName) || _default
    );
};

const JsonForm: ForwardRefRenderFunction<JsonFormRef, JsonFormProps> = (props, ref) => {
    const {
        fieldList,
        children,
        labelClassName,
        defaultCollapse = true,
        itemCol,
        itemRow,
        form: proForm,
        className,
        containerClassName = formStyles.formContainer,
        collapseItems,
        ..._props
    } = props;

    const enableCollapse = collapseItems && collapseItems.length > 0;

    const [collapse, setCollapse] = useState<boolean>(defaultCollapse); // 展开收起状态控制

    const [form] = Form.useForm(proForm);

    const btnWrap = useRef<HTMLDivElement>(null);

    useImperativeHandle(
        ref,
        () => {
            return {
                getFieldsValue: getValues,
                validateFields: () => {
                    return form.validateFields().then(() => {
                        return getValues();
                    });
                },
                setFieldsValue: (value: Store) => {
                    form.setFieldsValue(value);
                },
                resetFields: () => {
                    form.resetFields();
                },
            };
        },
        [fieldList],
    );

    const getValues = useCallback(
        (targetFieldList?: FormField[]) => {
            let values: Store = {};
            const target = targetFieldList || fieldList;
            (target as any[]).map((field: any) => {
                const { type } = field;
                if (Layout.typeList.includes(type)) {
                    // layout 组件
                    values = {
                        ...values,
                        ...getValues((field as LayoutProps).fieldList),
                    };
                } else if (LoadingItem.typeList.includes(type)) {
                    // @ts-ignore
                    const _field = (field as LoadingItemProps).loading._cache;
                    const _value = getValues(_field ? [_field] : []);
                    values = {
                        ...values,
                        ..._value,
                    };
                } else if (DynamicItem.typeList.includes(type)) {
                    const _value = getValues([(field as DynamicItemProps).dynamic(form)]);
                    values = {
                        ...values,
                        ..._value,
                    };
                } else {
                    const { formatter: formatterName, name } = (field as unknown) as any;
                    if (
                        FormInput.typeList.includes(type) ||
                        FormTextArea.typeList.includes(type) ||
                        FormSelect.typeList.includes(type) ||
                        FormDatePicker.typeList.includes(type)
                    ) {
                        values[name as string] = getFormatterFunc(
                            formatterName,
                            formatter.null,
                        )(form.getFieldValue(name));
                    } else if (FormDateRanger.typeList.includes(type)) {
                        const [name1, name2] = name;
                        values[name1] = getFormatterFunc(
                            formatterName?.[0],
                            formatter.null,
                        )(form.getFieldValue(name1));
                        values[name2] = getFormatterFunc(
                            formatterName?.[1],
                            formatter.null,
                        )(form.getFieldValue(name2));
                    } else if (
                        FormInputRange.typeList.includes(type) ||
                        FormNumberRange.typeList.includes(type)
                    ) {
                        const [name1, name2] = name;
                        values[name1 as string] = getFormatterFunc(
                            formatterName?.[0],
                            formatter.number,
                        )(form.getFieldValue(name1));
                        values[name2 as string] = getFormatterFunc(
                            formatterName?.[1],
                            formatter.number,
                        )(form.getFieldValue(name2));
                    } else if (CustomFragment.typeList.includes(type)) {
                        const { names } = field;
                        const _values = form.getFieldsValue(names);
                        values = {
                            ...values,
                            ..._values,
                        };
                    } else {
                        values[name] = getFormatterFunc(
                            formatterName,
                            formatter.null,
                        )(form.getFieldValue(name));
                    }
                }
            });
            return values;
        },
        [fieldList],
    );

    const onCollapseChange = useCallback(() => {
        // 需要判断当前元素位置
        setCollapse(!collapse);
    }, [collapse]);

    const collapseBtn = useMemo(() => {
        if (enableCollapse) {
            return (
                <div
                    ref={btnWrap}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                    className={formStyles.formItem}
                >
                    <Button type="link" style={{ float: 'right' }} onClick={onCollapseChange}>
                        {collapse ? (
                            <>
                                收起
                                <UpOutlined />
                            </>
                        ) : (
                            <>
                                展开
                                <DownOutlined />
                            </>
                        )}
                    </Button>
                </div>
            );
        } else {
            return null;
        }
    }, [collapse, enableCollapse]);

    const fromItemList = useMemo(() => {
        const showList = collapse ? undefined : collapseItems;
        return getFormItems(fieldList, form, labelClassName, itemCol, itemRow, showList);
    }, [fieldList, collapse, collapseItems]);

    const wrapChildren = useMemo(() => {
        return React.Children.map(children, child => {
            return <span className={formStyles.formItem}>{child}</span>;
        });
    }, [children]);

    const formContent = useMemo(() => {
        return (
            <>
                {fromItemList}
                {wrapChildren}
            </>
        );
    }, [fieldList, children, collapse, collapseItems]);

    return useMemo(() => {
        if (enableCollapse) {
            return (
                <div className={containerClassName}>
                    <div className={classNames(formStyles.flex, formStyles.flex1)}>
                        <div
                            className={classNames(formStyles.flex1, formStyles.flexRow)}
                            style={{ flexWrap: 'wrap' }}
                        >
                            <Form layout="inline" {..._props} form={form} className={className}>
                                {formContent}
                            </Form>
                        </div>
                        {collapseBtn}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={containerClassName}>
                    <Form layout="inline" {..._props} form={form} className={className}>
                        {formContent}
                    </Form>
                </div>
            );
        }
    }, [fieldList, collapse, children, collapseItems, enableCollapse]);
};

export default forwardRef(JsonForm);
