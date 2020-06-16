import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Form, TreeSelect } from 'antd';
import { IOptionItem } from './Select';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import { FormatterType } from '../../utils/formatter';
import { TreeSelectProps as AntdTreeSelectProps } from 'antd/es/tree-select';

import formStyles from '../_form.less';

export type TreeSelectType = 'treeSelect';
const typeList = ['treeSelect'];

type OptionsPromise = () => Promise<IOptionItem[]>;

export type TreeSelectProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        type: TreeSelectType;
        form: FormInstance;
        optionList?: IOptionItem[] | OptionsPromise; // 支持异步获取， 支持配置api地址及response path进行配置
        optionListDependence?: {
            name: FormItemName | FormItemName[]; // 依赖名成
            key: string; // 关联key，暂时不支持多个对应
        };
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: FormatterType;
        rules?: Rule[];
        labelClassName?: string;
        initialValue?: any;
        //  | 'options'
    } & Omit<AntdTreeSelectProps<string>, 'loading' | 'onChange' | 'className'>;

const FormTreeSelect = (props: TreeSelectProps) => {
    const {
        form,
        label,
        rules,
        name,
        labelClassName,
        optionListDependence,
        optionList,
        onChange,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        treeCheckable = true,
        treeDefaultExpandAll = true,
        maxTagCount = 6,
        treeNodeLabelProp = 'name',
        dropdownClassName = formStyles.customTreeSelect,
        initialValue,
        ...extraProps
    } = props;

    const [options, setOptions] = useState<IOptionItem[] | undefined>(undefined);

    const isFunction = typeof optionList === 'function';

    useEffect(() => {
        if (isFunction) {
            (optionList as OptionsPromise)()
                .then(optionList => {
                    setOptions(optionList);
                })
                .catch(() => {
                    setOptions([]);
                });
        }
    }, []);

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, []);

    const getOptionList = useCallback((): {
        loading: boolean;
        optionList: IOptionItem[];
    } => {
        if (isFunction) {
            if (optionListDependence) {
                const { name, key: dependenceKey } = optionListDependence;
                const dependenceNameList = typeof name === 'string' ? [name] : name || [];
                let parentItem = options;
                for (let i = 0; i < dependenceNameList.length; i++) {
                    const dependenceName = dependenceNameList[i];
                    // 兼容多选
                    let dependenceValue = form?.getFieldValue(dependenceName);
                    dependenceValue = Array.isArray(dependenceValue)
                        ? dependenceValue
                        : [dependenceValue];
                    const siblings = parentItem?.filter(({ value }) => {
                        return dependenceValue.indexOf(value) > -1;
                    });
                    if (siblings) {
                        let list: IOptionItem[] = [];
                        siblings.forEach(item => {
                            list = [...list, ...(item[dependenceKey] || [])];
                        });
                        parentItem = list;
                    } else {
                        parentItem = [];
                    }
                    // parentItem = siblings?.[dependenceKey] ?? undefined;
                }
                const loading = !options;
                const mergeList = parentItem || ([] as IOptionItem[]);
                return {
                    loading: loading,
                    optionList: mergeList,
                };
            } else {
                const loading = isFunction && !options;
                const mergeList = options || ([] as IOptionItem[]);
                return {
                    loading: loading,
                    optionList: mergeList,
                };
            }
        } else {
            return {
                loading: false,
                optionList: (optionList || []) as IOptionItem[],
            };
        }
    }, [optionListDependence, optionList, options]);

    const getTreeData = useCallback((optionList: IOptionItem[]) => {
        if (optionList.length === 0) {
            return [];
        }
        return [
            {
                name: '全部',
                value: 'all',
                children: optionList.map(({ name, value }) => ({
                    name,
                    value,
                })),
            },
        ];
    }, []);

    const getFormItem = useCallback(() => {
        const { loading, optionList: list } = getOptionList();
        const treeData = getTreeData(list);

        return (
            <Form.Item
                name={name}
                className={formItemClassName}
                label={<span className={labelClassName}>{label}</span>}
                rules={rules}
                initialValue={initialValue}
            >
                <TreeSelect
                    treeNodeLabelProp="name"
                    loading={loading}
                    className={className}
                    treeData={treeData}
                    treeCheckable={treeCheckable}
                    maxTagCount={maxTagCount}
                    treeDefaultExpandAll={treeDefaultExpandAll}
                    dropdownClassName={dropdownClassName}
                    {...eventProps}
                    {...extraProps}
                />
            </Form.Item>
        );
    }, [options, optionList, getOptionList]);

    return useMemo(() => {
        if (optionListDependence === void 0) {
            return getFormItem();
        } else {
            return (
                <Form.Item
                    noStyle={true}
                    shouldUpdate={(prevValues, currentValues) => {
                        const { name } = optionListDependence;
                        const dependenceNameList = typeof name === 'string' ? [name] : name || [];
                        let updated = false;
                        let i = 0;
                        let length = dependenceNameList.length;
                        while (!updated && i < length) {
                            const dependenceName = dependenceNameList[i];
                            updated = prevValues[dependenceName] !== currentValues[dependenceName];
                            i++;
                        }
                        return updated;
                    }}
                >
                    {() => {
                        return getFormItem();
                    }}
                </Form.Item>
            );
        }
    }, [options, optionList, optionListDependence, getFormItem]);
};

FormTreeSelect.typeList = typeList;

export default FormTreeSelect;
