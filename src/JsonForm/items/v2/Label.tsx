import { Form } from 'antd';
import React from 'react';
import { FormItemProps } from 'antd/es/form';
import formStyles from '../../_form.less';
import classNames from 'classnames';

export type LabelType = 'label@2';
const typeList = ['label@2'];

export type LabelProps<T = string> = Omit<FormItemProps, 'children'> & {
    type: LabelType;
    className?: string;
    labelClassName?: string;
    content: React.ReactNode;
    childProps?: {
        className?: string;
    };
};

const FormLabel = (props: LabelProps) => {
    const {
        className = formStyles.formItem,
        labelClassName,
        colon,
        content,
        labelCol,
        childProps,
        ...formItemProps
    } = props;

    return (
        <Form.Item
            className={className}
            labelCol={{
                ...labelCol,
                className: classNames(labelCol?.className, labelClassName),
            }}
            {...formItemProps}
        >
            <div className={formStyles.formItemDefault} {...childProps}>
                {content}
            </div>
        </Form.Item>
    );
};

FormLabel.typeList = typeList;

export default FormLabel;
