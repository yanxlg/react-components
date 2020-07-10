import { Form, Input } from 'antd';
import React, { useMemo } from 'react';
import { FormItemName } from '../../index';
import { FormInstance, FormItemProps } from 'antd/es/form';
import RichInput, { RichType } from '../../../RichInput';
import { InputProps as AntInputProps } from 'antd/es/input';
import formStyles from '../../_form.less';
import { FormatterType } from '../../../utils/formatter';
import { NamePath } from 'rc-field-form/lib/interface';
import classNames from 'classnames';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input/TextArea';

export type InputTypeAll = InputType | TextareaType;

type InputType =
    | 'input@2'
    | 'integer@2'
    | 'number@2'
    | 'positiveInteger@2'
    | 'numberSplit@2'
    | 'naturalNumber@2';

type TextareaType = 'textarea@2';

const typeList = ['input@2', 'integer@2', 'number@2', 'positiveInteger@2', 'textarea@2'];

const { TextArea } = Input;

type InputTypeProp = {
    type: InputType;
    childrenProps?: Omit<AntInputProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
};

type TextareaTypeProp = {
    type: TextareaType;
    childrenProps?: Omit<AntTextAreaProps, 'type' | 'size' | 'onPressEnter' | 'form' | 'onChange'>;
};

export type InputProps = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string;
} & (InputTypeProp | TextareaTypeProp);

const FormInput = (props: InputProps) => {
    const {
        className = formStyles.formItem,
        onChange,
        labelClassName,
        form,
        type,
        childrenProps,
        labelCol,
        ...formItemProps
    } = props;

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, []);

    return useMemo(() => {
        return (
            <Form.Item
                className={className}
                labelCol={{
                    ...labelCol,
                    className: classNames(labelCol?.className, labelClassName),
                }}
                {...formItemProps}
            >
                {type === 'textarea@2' ? (
                    <TextArea
                        allowClear={true}
                        className={formStyles.formItemDefault}
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        {...(childrenProps as AntTextAreaProps)}
                        {...eventProps}
                    />
                ) : (
                    <RichInput
                        allowClear={true}
                        className={formStyles.formItemDefault}
                        {...(childrenProps as AntInputProps)}
                        {...eventProps}
                        richType={(type as string).replace(/@\d+/, '') as RichType}
                    />
                )}
            </Form.Item>
        );
    }, [childrenProps, formItemProps]);
};

FormInput.typeList = typeList;

export default FormInput;
