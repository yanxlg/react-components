import { Form } from 'antd';
import React, { useMemo } from 'react';
import { CustomFormProps } from '../index';
import { FormInstance } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { InputProps as AntInputProps } from 'antd/es/input';
import formStyles from '../_form.less';

export type LabelType = 'label';
const typeList = ['label'];

export type LabelProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: LabelType;
        className?: string;
        formItemClassName?: string;
        labelClassName?: string;
        hide?: boolean;
        content: React.ReactNode;
    } & Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;

const FormLabel = (props: LabelProps) => {
    const {
        name,
        placeholder,
        label,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        labelClassName,
        form,
        type,
        colon,
        hide,
        content,
        ..._props
    } = props;

    return useMemo(() => {
        return (
            <Form.Item
                className={formItemClassName}
                name={name}
                label={<span className={labelClassName}>{label}</span>}
                colon={colon}
                style={
                    hide
                        ? {
                              display: 'none',
                          }
                        : {}
                }
            >
                <div className={className}>{content}</div>
            </Form.Item>
        );
    }, [_props, hide]);
};

FormLabel.typeList = typeList;

export default FormLabel;
