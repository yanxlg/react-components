import { Form, Select, Radio } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CustomFormProps, FormItemName } from '../index';
import { FormInstance, Rule } from 'antd/es/form';
import { FormItemLabelProps } from 'antd/es/form/FormItemLabel';
import formStyles from '../_form.less';
import { SelectProps as AntdSelectProps } from 'antd/es/select/index';
import { FormatterType } from '../../utils/formatter';

export declare interface IOptionItem {
    name: string;
    value: string | number;

    [key: string]: any; // 子节点key
}

type OptionsPromise = () => Promise<IOptionItem[]>;

export type SelectType = 'select';
const typeList = ['select'];

export type SelectProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        type: SelectType;
        form: FormInstance;
        placeholder?: string;
        optionList?: IOptionItem[] | OptionsPromise; // 支持异步获取， 支持配置api地址及response path进行配置
        syncDefaultOption?: IOptionItem; // 异步获取options是默认选项，通常用于胚子'全部'
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
        isShortcut?: boolean;
    } & Omit<AntdSelectProps<string>, 'loading' | 'onChange' | 'className' | 'options'>;

const FormSelect = (props: SelectProps) => {
    const {
        name,
        label,
        className = formStyles.formItemDefault,
        formItemClassName = formStyles.formItem,
        syncDefaultOption,
        optionListDependence,
        onChange,
        labelClassName,
        form,
        optionList,
        rules,
        mode,
        maxTagCount,
        placeholder,
        isShortcut = false,
        disabled,
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
                    const dependenceValue = form?.getFieldValue(dependenceName);

                    const siblings = parentItem?.find(({ value }) => {
                        return value === dependenceValue;
                    });
                    parentItem = siblings?.[dependenceKey] ?? undefined;
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

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, []);

    const dropdownRender = useCallback(
        (menu: React.ReactElement): React.ReactElement => {
            const { optionList: list } = getOptionList();
            if (isShortcut) {
                return (
                    <div>
                        <Radio.Group style={{ display: 'flex', padding: '5px 0' }} value="">
                            <Radio.Button
                                value="1"
                                style={{ flex: 1, textAlign: 'center' }}
                                onClick={() => {
                                    form!.setFieldsValue({
                                        [name]: list!.map(item => item.value),
                                    });
                                }}
                            >
                                全选
                            </Radio.Button>
                            <Radio.Button
                                value="0"
                                style={{ flex: 1, textAlign: 'center' }}
                                onClick={() => {
                                    form!.setFieldsValue({
                                        [name]: [],
                                    });
                                }}
                            >
                                取消全选
                            </Radio.Button>
                        </Radio.Group>
                        {menu}
                    </div>
                );
            }
            return menu;
        },
        [isShortcut, getOptionList],
    );

    return useMemo(() => {
        if (optionListDependence === void 0) {
            const { loading, optionList: list } = getOptionList();
            return (
                <Form.Item
                    name={name}
                    className={formItemClassName}
                    label={<span className={labelClassName}>{label}</span>}
                    rules={rules}
                >
                    <Select
                        disabled={disabled}
                        className={className}
                        loading={loading}
                        mode={mode}
                        maxTagCount={maxTagCount}
                        {...eventProps}
                        placeholder={placeholder}
                        dropdownRender={dropdownRender}
                        {...extraProps}
                    >
                        {syncDefaultOption ? (
                            <Select.Option value={syncDefaultOption.value}>
                                {syncDefaultOption.name}
                            </Select.Option>
                        ) : null}
                        {list!.map(item => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            );
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
                    {({ getFieldValue }) => {
                        const { loading, optionList: list } = getOptionList();
                        return (
                            <Form.Item
                                name={name}
                                className={formItemClassName}
                                label={<span className={labelClassName}>{label}</span>}
                                rules={rules}
                            >
                                <Select
                                    disabled={disabled}
                                    className={className}
                                    loading={loading}
                                    mode={mode}
                                    maxTagCount={maxTagCount}
                                    {...eventProps}
                                    dropdownRender={dropdownRender}
                                    {...extraProps}
                                >
                                    {syncDefaultOption ? (
                                        <Select.Option value={syncDefaultOption.value}>
                                            {syncDefaultOption.name}
                                        </Select.Option>
                                    ) : null}
                                    {list!.map(item => (
                                        <Select.Option key={item.value} value={item.value}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            );
        }
    }, [options, optionList, optionListDependence, disabled]);
};

FormSelect.typeList = typeList;

export default FormSelect;
