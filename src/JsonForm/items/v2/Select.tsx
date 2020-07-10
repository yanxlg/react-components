import { Form, Select, TreeSelect } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import { SelectProps as AntdSelectProps } from 'antd/es/select/index';
import { TreeSelectProps } from 'antd/es/tree-select';
import classNames from 'classnames';
import { NamePath } from 'rc-field-form/lib/interface';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useUpdate from '../../../hooks/useUpdate';
import baseRequest from '../../../request';
import { FormatterType } from '../../../utils/formatter';
import formStyles from '../../_form.less';
import { FormItemName } from '../../index';

export type SelectType = 'select@2';
const typeList = ['select@2'];

export interface ISelector {
    selector: (state: any) => unknown;
    equalityFn?: (left: unknown, right: unknown) => boolean;
}

interface IHttpOptions {
    url: string;
    request?: {
        get: (url: string) => Promise<any>;
        [key: string]: any;
    };
    dataPath?: NamePath; // default:data
}

export interface IOptionItem {
    label: string;
    value: any;
    disabled?: boolean;

    [key: string]: any; // 其他属性
}

type SelectComponentProps = Omit<AntdSelectProps<string>, 'loading' | 'onChange' | 'options'> & {
    mode?: Exclude<'tags' | 'multiple', AntdSelectProps<string>['mode']>;
};

type MultipleSelectProps = Omit<TreeSelectProps<string>, 'loading' | 'onChange' | 'treeData'> & {
    mode: 'tags' | 'multiple';
};

export type SelectProps = Omit<FormItemProps, 'children'> & {
    type: SelectType;
    form: FormInstance;
    defaultOption?: { label: string; value?: any } | true; // 默认全选配置
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string | false;
    options: IOptionItem[] | IHttpOptions | ISelector; // 支持异步获取， 支持配置api地址及response path进行配置
    optionKeys?: [string, string]; // option item key 映射到label value的字典
    relation?: {
        name: NamePath; // 依赖名称
        key?: string; // 关联key,默认为children
    }; // 依赖关联
    onChange?: (name: NamePath, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
    itemProps?: SelectComponentProps | MultipleSelectProps;
};

function getValueByNamePath(target: any, namePath: NamePath): any {
    if (Array.isArray(namePath)) {
        const name = namePath.shift();
        if (namePath.length === 0) {
            return target[name];
        } else {
            return getValueByNamePath(target[name], namePath);
        }
    } else {
        return target[namePath];
    }
}

const FormSelect = (props: SelectProps) => {
    const {
        label,
        className = formStyles.formItem,
        relation,
        onChange,
        labelClassName,
        form,
        options,
        itemProps,
        defaultOption = true,
        optionKeys = ['label', 'value'],
        labelCol,
        ...formItemProps
    } = props;

    const withSelector = !!options['selector'];
    const withRequest = !!options['url'];
    const withList = Array.isArray(options);

    const [mergeOptions, setMergeOptions] = useState<IOptionItem[]>(
        withList ? (options as IOptionItem[]) : undefined,
    );

    useUpdate(() => {
        if (Array.isArray(options)) {
            setMergeOptions(options);
        }
    }, [options]);

    const reduxOptions = useSelector(
        withSelector ? options['selector'] : () => undefined,
        options['equalityFn'],
    ) as IOptionItem[] | undefined;

    useEffect(() => {
        if (withRequest) {
            const { url, request = baseRequest, dataPath = 'data' } = options as IHttpOptions;
            request
                .get(url)
                .then(result => {
                    setMergeOptions(getValueByNamePath(result, dataPath));
                })
                .catch(() => {
                    setMergeOptions([]);
                });
        }
    }, []);

    const getOptionList = useCallback((): {
        loading: boolean;
        options: IOptionItem[];
    } => {
        if (withRequest || withSelector) {
            const mOptions = withRequest ? mergeOptions : reduxOptions;
            if (relation) {
                const { name: namePath, key: dependenceKey = 'children' } = relation;
                const dependenceNameList = Array.isArray(namePath) ? namePath : [namePath];
                let parentItem = mOptions;
                for (const dependenceName of dependenceNameList) {
                    // 兼容多选
                    let dependenceValue = form?.getFieldValue(dependenceName);
                    dependenceValue = Array.isArray(dependenceValue)
                        ? dependenceValue
                        : [dependenceValue];
                    const siblings = parentItem?.filter(item => {
                        const value = item[optionKeys[1]];
                        return dependenceValue.indexOf(value) > -1;
                    });
                    if (siblings) {
                        const list: IOptionItem[] = [];
                        siblings.forEach(item => {
                            list.push(...(item[dependenceKey] || []));
                        });
                        parentItem = list;
                    } else {
                        parentItem = [];
                    }
                }
                const loading = !options;
                const mergeList = parentItem || ([] as IOptionItem[]);
                return {
                    loading: loading,
                    options: mergeList,
                };
            } else {
                const loading = withRequest && !mOptions;
                const mergeList = mOptions || ([] as IOptionItem[]);
                return {
                    loading: loading,
                    options: mergeList,
                };
            }
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
    }, [mergeOptions, reduxOptions]);

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, [onChange]);

    const getTreeData = useCallback((optionList: IOptionItem[]) => {
        if (defaultOption) {
            const isBoolean = typeof defaultOption === 'boolean';
            const parentName = isBoolean ? '全部' : defaultOption['label'];
            const parentValue = isBoolean ? '' : defaultOption['value'] || '';
            return [
                {
                    label: parentName,
                    value: parentValue,
                    children: optionList.map(item => ({
                        ...item,
                        name: item[optionKeys[0]],
                        value: item[optionKeys[1]],
                    })),
                },
            ];
        } else {
            return optionList.map(item => ({
                ...item,
                label: item[optionKeys[0]],
                value: item[optionKeys[1]],
            }));
        }
    }, []);

    const getSelectData = useCallback((optionList: IOptionItem[]) => {
        if (defaultOption) {
            const isBoolean = typeof defaultOption === 'boolean';
            const parentName = isBoolean ? '全部' : defaultOption['label'];
            const parentValue = isBoolean ? '' : defaultOption['value'] || '';
            return [
                {
                    label: parentName,
                    value: parentValue,
                },
                ...optionList,
            ];
        } else {
            return optionList;
        }
    }, []);

    const formItem = useCallback(() => {
        const { loading, options: list } = getOptionList();
        const multiple = itemProps && (itemProps.mode === 'tags' || itemProps.mode === 'multiple');
        const data = multiple ? getTreeData(list) : getSelectData(list);
        return (
            <Form.Item
                name={name}
                className={className}
                label={label}
                labelCol={{
                    ...labelCol,
                    className: classNames(labelCol?.className, labelClassName),
                }}
                {...formItemProps}
            >
                {multiple ? (
                    <TreeSelect
                        treeNodeLabelProp="label"
                        className={className}
                        treeCheckable={true}
                        treeDefaultExpandAll={true}
                        showArrow={true}
                        showCheckedStrategy={'SHOW_PARENT'}
                        treeNodeFilterProp={'title'}
                        {...(itemProps as MultipleSelectProps)}
                        {...eventProps}
                        loading={loading}
                        treeData={data}
                    />
                ) : (
                    <Select
                        {...(itemProps as SelectComponentProps)}
                        options={data}
                        loading={loading}
                        {...eventProps}
                    />
                )}
            </Form.Item>
        );
    }, [mergeOptions, reduxOptions]);

    return useMemo(() => {
        if (relation === void 0) {
            return formItem();
        } else {
            return (
                <Form.Item
                    noStyle={true}
                    shouldUpdate={(prevValues, currentValues) => {
                        const { name: namePath } = relation;
                        const dependenceNameList = Array.isArray(namePath) ? namePath : [namePath];
                        let updated = false;
                        let i = 0;
                        const length = dependenceNameList.length;
                        while (!updated && i < length) {
                            const dependenceName = dependenceNameList[i];
                            updated = prevValues[dependenceName] !== currentValues[dependenceName];
                            i++;
                        }
                        return updated;
                    }}
                >
                    {({ getFieldValue }) => {
                        return formItem();
                    }}
                </Form.Item>
            );
        }
    }, [mergeOptions, reduxOptions]);
};

FormSelect.typeList = typeList;

export default FormSelect;
