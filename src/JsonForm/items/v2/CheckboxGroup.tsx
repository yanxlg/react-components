import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Form, Spin } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/lib/checkbox/Group';
import formStyles from '../../_form.less';
import { NamePath } from 'rc-field-form/lib/interface';
import {
    getValueByNamePath,
    IHttpOptions,
    IOptionItem,
    ISelector,
    parseOptionList,
} from './Select';
import classNames from 'classnames';
import useUpdate from '../../../hooks/useUpdate';
import { useSelector } from 'react-redux';
import { CheckboxOptionType } from 'antd/es/checkbox';
import baseRequest from '../../../request';
import { iterator } from '../../..';

export type CheckboxGroupType = 'checkboxGroup@2';
const typeList = ['checkboxGroup@2'];

export type CheckboxGroupProps = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    type: CheckboxGroupType;
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    name: NamePath;
    labelClassName?: string;
    options: CheckboxOptionType[] | IHttpOptions | ISelector; // 支持异步获取， 支持配置api地址及response path进行配置
    optionKeys?: [string, string]; // option item key 映射到label value的字典
    childrenProps?: Omit<AntdCheckboxGroupProps, 'onChange'>;
    showLoading?: boolean;
};

const FormCheckboxGroup = (props: CheckboxGroupProps) => {
    const {
        labelClassName,
        className = formStyles.formItem,
        onChange,
        form,
        childrenProps,
        type,
        options,
        optionKeys,
        showLoading = true,
        labelCol,
        ...formItemProps
    } = props;

    const withSelector = !!options['selector'];
    const withRequest = !!options['url'];
    const withList = Array.isArray(options);

    const [mergeOptions, setMergeOptions] = useState<CheckboxOptionType[]>(
        withList
            ? (parseOptionList(options as CheckboxOptionType[], optionKeys) as CheckboxOptionType[])
            : undefined,
    );

    useUpdate(() => {
        if (Array.isArray(options)) {
            setMergeOptions(options);
        }
    }, [options]);

    const reduxOptions = useSelector(
        withSelector
            ? (state: any) => {
                  const primaryValue = options['selector'](state);
                  return primaryValue ? parseOptionList(primaryValue, optionKeys) : undefined;
              }
            : () => undefined,
        options['equalityFn'],
    ) as IOptionItem[] | undefined;

    useEffect(() => {
        if (withRequest) {
            const {
                url,
                request = baseRequest,
                dataPath = 'data',
                parser = 'array',
            } = options as IHttpOptions;
            request
                .get(url)
                .then(result => {
                    const values = getValueByNamePath(result, dataPath);
                    const parseOptions =
                        parser === 'array'
                            ? parseOptionList(values, optionKeys)
                            : iterator(values, (key, value) => {
                                  return {
                                      label: value,
                                      value: key as string,
                                  };
                              });
                    setMergeOptions(parseOptions);
                })
                .catch(() => {
                    setMergeOptions([]);
                });
        }
    }, []);

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as NamePath, form);
                  },
              }
            : {};
    }, []);

    const getOptionList = useCallback((): {
        loading: boolean;
        options: CheckboxOptionType[];
    } => {
        if (withRequest || withSelector) {
            const mOptions = withRequest ? mergeOptions : reduxOptions;
            const loading = withRequest && !mOptions;
            const mergeList = mOptions || ([] as IOptionItem[]);
            return {
                loading: loading,
                options: mergeList,
            };
        }
        if (withList) {
            return {
                loading: false,
                options: mergeOptions,
            };
        }
        return {
            loading: false,
            options: [],
        };
    }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);

    return useMemo(() => {
        const { loading, options } = getOptionList();
        return (
            <Form.Item
                className={className}
                labelCol={{
                    ...labelCol,
                    className: classNames(labelCol?.className, labelClassName),
                }}
                {...formItemProps}
            >
                {loading && showLoading ? (
                    <Spin spinning={true} />
                ) : (
                    <Checkbox.Group
                        {...(childrenProps as AntdCheckboxGroupProps)}
                        options={options}
                        {...eventProps}
                    />
                )}
            </Form.Item>
        );
    }, [mergeOptions, reduxOptions, childrenProps, formItemProps]);
};

FormCheckboxGroup.typeList = typeList;

export default FormCheckboxGroup;
