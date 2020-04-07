import React, {
    forwardRef,
    ForwardRefRenderFunction,
    ReactElement,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { Button, Col, Form, Row } from "antd";
import { FormProps } from "antd/lib/form/Form";
import FormInput, { InputType, InputProps, InputFormatter } from "./items/Input";
import FormSelect, { SelectType, SelectProps, SelectFormatter } from "./items/Select";
import FormCheckbox, { CheckboxType, CheckboxProps } from "./items/Checkbox";
import FormDatePicker, {
    DatePickerProps,
    DatePickerType,
    DatePickerFormatter,
} from "./items/DatePicker";
import FormDateRanger, {
    DateRangerType,
    DateRangerProps,
    DateRangerFormatter,
} from "./items/DateRanger";
import FormInputRange, { InputRangeType, InputRangeProps } from "./items/InputRange";
import { Store, ValidateFields } from "rc-field-form/lib/interface";
import { FormInstance } from "antd/es/form";
import RcResizeObserver from "rc-resize-observer";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { ColProps } from "antd/lib/grid/col";
import { RowProps } from "antd/lib/grid/row";
import FormCheckboxGroup, { CheckboxGroupProps, CheckboxGroupType } from "./items/CheckboxGroup";
import FormRadioGroup, { RadioGroupProps, RadioGroupType } from "./items/RadioGroup";
import classNames from "classnames";

import "./index.less";
import formStyles from "./_form.less";
import Layout, { LayoutType, LayoutProps } from "./layout";

export declare interface CustomFormProps {
    labelClassName?: string;
}

export type FormField<T = string> = (
    | Omit<InputProps<T>, "form">
    | Omit<SelectProps<T>, "form">
    | Omit<CheckboxProps<T>, "form">
    | Omit<DatePickerProps<T>, "form">
    | Omit<DateRangerProps<T>, "form">
    | Omit<CheckboxGroupProps<T>, "form">
    | Omit<RadioGroupProps<T>, "form">
    | Omit<InputRangeProps<T>, "form">
    | Omit<LayoutProps<T>, "form">
) & {
    form?: FormInstance;
};

declare interface JsonFormProps<T = any> extends FormProps, CustomFormProps {
    fieldList: Array<FormField<T>>;
    rowHeight?: number; // 行高，默认为60
    defaultCollapse?: boolean; // 初始状态，默认为true
    enableCollapse?: boolean; // 默认为true
    itemCol?: ColProps;
    itemRow?: RowProps;
}

export type FormItemName<T = string> = T;

export declare interface CustomFormProps {
    labelClassName?: string;
}

export interface JsonFormRef {
    getFieldsValue: () => Store;
    validateFields: ValidateFields;
    setFieldsValue: (value: Store) => void;
}

export const getColChildren = (children: ReactElement, itemCol?: ColProps, times: number = 1) => {
    if (itemCol) {
        return <Col {...itemCol}>{children}</Col>;
    } else {
        return children;
    }
};

export const getFormItems = (
    fieldList: Array<FormField>,
    form: FormInstance,
    labelClassName?: string,
    itemCol?: ColProps,
    itemRow?: RowProps,
) => {
    const fields = fieldList.map(({ type, ...field }, index) => {
        const name = field["name"];
        if (FormInput.typeList.includes(type)) {
            return getColChildren(
                <FormInput
                    key={String(name)}
                    {...(field as InputProps)}
                    type={type as InputType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }
        if (FormSelect.typeList.includes(type)) {
            return getColChildren(
                <FormSelect
                    key={String(name)}
                    {...(field as SelectProps)}
                    type={type as SelectType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }
        if (FormCheckbox.typeList.includes(type)) {
            return getColChildren(
                <FormCheckbox
                    key={String(name)}
                    {...(field as CheckboxProps)}
                    type={type as CheckboxType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }
        if (FormDatePicker.typeList.includes(type)) {
            return getColChildren(
                <FormDatePicker
                    key={String(name)}
                    {...(field as DatePickerProps)}
                    type={type as DatePickerType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }
        if (FormDateRanger.typeList.includes(type)) {
            return getColChildren(
                <FormDateRanger
                    key={String(name)}
                    {...(field as DateRangerProps)}
                    type={type as DateRangerType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }

        if (FormCheckboxGroup.typeList.includes(type)) {
            return getColChildren(
                <FormCheckboxGroup
                    key={String(name)}
                    {...(field as CheckboxGroupProps)}
                    type={type as CheckboxGroupType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }
        if (FormRadioGroup.typeList.includes(type)) {
            return getColChildren(
                <FormRadioGroup
                    key={String(name)}
                    {...(field as RadioGroupProps)}
                    type={type as RadioGroupType}
                    labelClassName={labelClassName}
                    form={form}
                />,
                itemCol,
            );
        }
        if (FormInputRange.typeList.includes(type)) {
            return (
                <FormInputRange
                    key={String(name)}
                    {...(field as InputRangeProps)}
                    type={type as InputRangeType}
                    labelClassName={labelClassName}
                    form={form}
                />
            );
        }
        if (Layout.typeList.includes(type)) {
            return getColChildren(
                <Layout
                    key={String(index)}
                    {...(field as LayoutProps)}
                    type={type as LayoutType}
                    labelClassName={labelClassName}
                    form={form}
                    itemRow={itemRow}
                    itemCol={itemCol}
                />,
                itemCol,
            );
        }
        return null;
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

const JsonForm: ForwardRefRenderFunction<JsonFormRef, JsonFormProps> = (props, ref) => {
    const {
        fieldList,
        children,
        labelClassName,
        rowHeight = 56,
        defaultCollapse = true,
        enableCollapse = true,
        itemCol,
        itemRow,
        form: proForm,
        ..._props
    } = props;

    const [collapse, setCollapse] = useState<boolean>(defaultCollapse);

    const [collapseBtnVisible, setCollapseBtnVisible] = useState(false);

    const [form] = Form.useForm(proForm);

    const wrapRef = useRef<HTMLDivElement>(null);
    const btnWrap = useRef<HTMLDivElement>(null);

    const [formHeight, setFormHeight] = useState<number | undefined>(
        defaultCollapse ? rowHeight : undefined,
    );

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
                } else {
                    const { formatter, name } = (field as unknown) as any;
                    if (FormInput.typeList.includes(type)) {
                        values[name as string] = FormInput.formatter(formatter as InputFormatter)(
                            form.getFieldValue(name),
                        );
                    } else if (FormSelect.typeList.includes(type)) {
                        values[name as string] = FormSelect.formatter(formatter as SelectFormatter)(
                            form.getFieldValue(name),
                        );
                    } else if (FormDateRanger.typeList.includes(type)) {
                        const [name1, name2] = name;
                        values[name1] = FormDateRanger.formatter(
                            formatter?.[0] as DateRangerFormatter,
                        )(form.getFieldValue(name1));
                        values[name2] = FormDateRanger.formatter(
                            formatter?.[1] as DateRangerFormatter,
                        )(form.getFieldValue(name2));
                    } else if (FormDatePicker.typeList.includes(type)) {
                        values[name as string] = FormDatePicker.formatter(
                            formatter as DatePickerFormatter,
                        )(form.getFieldValue(name));
                    } else if (FormInputRange.typeList.includes(type)) {
                        const [name1, name2] = name;
                        values[name1 as string] = FormInputRange.formatter()(
                            form.getFieldValue(name1),
                        );
                        values[name2 as string] = FormInputRange.formatter()(
                            form.getFieldValue(name2),
                        );
                    } else {
                        values[name] = form.getFieldValue(name);
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

    const equalSize = useCallback((size, value) => {
        return Math.abs(value - size) <= 1;
    }, []);

    const onResize = useCallback(({ height, width }) => {
        if (enableCollapse) {
            const btnWrapOffsetLeft = btnWrap.current!.offsetLeft;
            if (btnWrapOffsetLeft === 0) {
                // 按钮换行了
                if (equalSize(height, rowHeight * 2)) {
                    setFormHeight(rowHeight);
                    setCollapseBtnVisible(false);
                    return;
                }
            }
            if (equalSize(height, rowHeight)) {
                setCollapseBtnVisible(false);
                setFormHeight(height);
                return;
            }
            setFormHeight(height);
            setCollapseBtnVisible(true);
        }
    }, []);

    const collapseBtn = useMemo(() => {
        if (enableCollapse) {
            return (
                <div
                    ref={btnWrap}
                    style={{
                        display: "flex",
                        flex: collapse ? 1 : 0,
                        justifyContent: "flex-end",
                        visibility: collapseBtnVisible ? "visible" : "hidden",
                    }}
                >
                    <Button
                        type="link"
                        className={formStyles.formItem}
                        style={{ float: "right" }}
                        onClick={onCollapseChange}
                    >
                        {collapse ? (
                            <>
                                收起至一行
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
    }, [collapseBtnVisible, collapse]);

    const fromItemList = useMemo(() => {
        return getFormItems(fieldList, form, labelClassName, itemCol, itemRow);
    }, [fieldList]);

    const formContent = useMemo(() => {
        if (collapse) {
            return (
                <>
                    {fromItemList}
                    {children}
                    {collapseBtn}
                </>
            );
        } else {
            return (
                <div className={classNames(formStyles.flex, formStyles.flex1)}>
                    <div
                        className={classNames(formStyles.flex1, formStyles.flexRow)}
                        style={{ flexWrap: "wrap" }}
                    >
                        {fromItemList}
                    </div>
                    {children}
                    {collapseBtn}
                </div>
            );
        }
    }, [fieldList, children, collapse, collapseBtnVisible]);

    const formComponent = useMemo(() => {
        return (
            <RcResizeObserver onResize={onResize}>
                <div>
                    <Form layout="inline" {..._props} form={form}>
                        {formContent}
                    </Form>
                </div>
            </RcResizeObserver>
        );
    }, [fieldList, collapseBtnVisible, collapse, children]);

    return useMemo(() => {
        const style = enableCollapse
            ? collapse
                ? {
                      overflow: "hidden",
                      height: formHeight,
                  }
                : {
                      overflow: "hidden",
                      height: rowHeight,
                  }
            : {};

        return (
            <div ref={wrapRef} style={style}>
                {formComponent}
            </div>
        );
    }, [formHeight, fieldList, collapseBtnVisible, collapse, children]);
};

export default forwardRef(JsonForm);

export * from "./utils";
