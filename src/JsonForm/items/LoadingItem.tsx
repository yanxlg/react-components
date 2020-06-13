import React, { useCallback, useEffect, useState } from 'react';
import { Form, Spin } from 'antd';
import { FormField, getColChildren, getFormItem } from '../index';
import { FormInstance } from 'antd/es/form';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import LoadingButton from '../../LoadingButton';

export type LoadingType = 'loading';
const typeList = ['loading'];

export declare interface LoadingItemProps<T = string> {
    type: LoadingType;
    form: FormInstance;
    loading: (form: FormInstance) => Promise<FormField>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
    placeholder: {
        label: string;
    };
}

const LoadingItem = ({
    placeholder,
    loading,
    form,
    labelClassName,
    itemCol,
    itemRow,
}: LoadingItemProps) => {
    const [loadState, setLoadState] = useState(true);
    const [field, setField] = useState<FormField | undefined>(undefined);
    // 重试
    useEffect(() => {
        loading(form)
            .then(field => {
                setField(field);
            })
            .finally(() => {
                setLoadState(false);
            });
    }, []);

    const onReload = useCallback(() => {
        setLoadState(true);
        return loading(form)
            .then(field => {
                setField(field);
            })
            .finally(() => {
                setLoadState(false);
            });
    }, []);

    return loadState
        ? getColChildren(
              <Form.Item noStyle={true} label={placeholder.label}>
                  <Spin spinning={true} />
              </Form.Item>,
              itemCol,
          )
        : field
        ? getColChildren(
              <Form.Item noStyle={true} label={placeholder.label}>
                  <LoadingButton type="link" onClick={onReload}>
                      重试
                  </LoadingButton>
              </Form.Item>,
              itemCol,
          )
        : getFormItem(field, form, labelClassName, itemCol, itemRow);
};

LoadingItem.typeList = typeList;

export default LoadingItem;
