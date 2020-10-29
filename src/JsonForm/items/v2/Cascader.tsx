import React, { useMemo, useState, useEffect } from 'react';
import { Form, Cascader } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { FormItemName } from '../../index';
import { NamePath } from 'rc-field-form/lib/interface';
import {
    CascaderOptionType,
    CascaderProps as AntdCascaderProps,
    FieldNamesType,
} from 'antd/lib/cascader';
import classnames from 'classnames';
import formStyles from '../../_form.less';

export type CascaderType = 'cascader@2';
const typeList = ['cascader@2'];

export type CascaderProps<T = string> = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    type: CascaderType;
    onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    labelClassName?: string;
    childrenProps?: Omit<AntdCascaderProps, 'onChange' | 'options'> & {
        options?: CascaderOptionType[];
        service?: () => Promise<any>;
        dataPath?: string | null; // default:data
    };
};

function filter(inputValue: string, path: CascaderOptionType[], fieldNames: FieldNamesType) {
    return path.some(option => {
        return (
            (option[fieldNames ? fieldNames.label : 'label'] as string)
                .toLowerCase()
                .indexOf(inputValue.toLowerCase()) > -1
        );
    });
}

const FormCascader = (props: CascaderProps) => {
    const {
        className = formStyles.formItem,
        labelCol,
        labelClassName,
        childrenProps,
        form,
        onChange,
        ...formItemProps
    } = props;

    const [optionList, setOptionList] = useState<CascaderOptionType[]>([]);

    const { options = [], service, dataPath = 'data', ...restChildrenProps } = childrenProps;

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, [onChange]);

    useEffect(() => {
        if (service && typeof service === 'function') {
            service().then(res => {
                dataPath ? setOptionList(res[dataPath]) : setOptionList(res);
            });
        }
    }, []);

    return useMemo(() => {
        return (
            <Form.Item
                className={className}
                labelCol={{
                    ...labelCol,
                    className: classnames(labelCol?.className, labelClassName),
                }}
                {...formItemProps}
            >
                <Cascader
                    showSearch={{
                        filter: (inputValue, path) =>
                            filter(inputValue, path, childrenProps.fieldNames),
                    }}
                    options={service ? optionList : options}
                    {...eventProps}
                    {...restChildrenProps}
                />
            </Form.Item>
        );
    }, [optionList, options, restChildrenProps]);
};

FormCascader.typeList = typeList;

export default FormCascader;
