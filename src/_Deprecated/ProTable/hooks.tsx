import { GetRowKey } from 'antd/es/table/interface';
import React, { useCallback, useMemo, useRef } from 'react';
import OptimizeCheckbox, { CheckboxRef } from './component/Checkbox';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ProColumns, SimpleRowSelection } from './Table';
import styles from './_index.less';

function useRowSelection<T, U>(
    columns: ProColumns<T>[],
    rowKey: string | GetRowKey<T>,
    dataSource: T[],
    rowSelection: SimpleRowSelection<T>,
    optimize: boolean,
    onSelectedRowKeysUpdate: (selectedRowKeys: (string | number)[]) => void,
) {
    const { onChange, columnWidth, fixed } = rowSelection;
    // key=>Ref形式存储

    const allCheckedRefList = useRef<Map<string, CheckboxRef>>(new Map());

    const itemsRefList = useRef<Map<string, CheckboxRef>>(new Map());

    const outerOnChange = useCallback(
        (keys: string[], items: T[]) => {
            if (onChange) {
                // 延迟同步，防止卡顿
                onChange(keys, items);
            }
            onSelectedRowKeysUpdate(keys);
        },
        [onChange],
    );

    const onSelectAll = useCallback(
        (e: CheckboxChangeEvent) => {
            const checked = e.target.checked;
            if (checked) {
                let keys: string[] = [];
                itemsRefList.current.forEach(item => {
                    if (item) {
                        item.updateChecked(true);
                        keys.push(item.getValue());
                    }
                });
                outerOnChange(keys, dataSource || []);
            } else {
                itemsRefList.current.forEach(item => {
                    item && item.updateChecked(false);
                });
                outerOnChange([], []);
            }
        },
        [onChange, dataSource],
    );

    const onChecked = useCallback(
        (e: CheckboxChangeEvent) => {
            const checked = e.target.checked;
            const value = e.target.value;

            // 从ref中获取keys,不能接收props中selectedKeys，否则columns会发生变化，整个会重新渲染
            let beforeKeys: string[] = [];
            itemsRefList.current.forEach(item => {
                const values = item?.getValues();
                if (values?.checked) {
                    beforeKeys.push(values.value);
                }
            });
            const set = new Set(beforeKeys);
            if (checked) {
                // 判断全选状态
                set.add(value);
            } else {
                // 判断全选状态
                set.delete(value);
            }
            beforeKeys = Array.from(set);
            const size = beforeKeys.length;
            if (size === 0) {
                allCheckedRefList.current.forEach(item => item?.updateChecked(false));
            } else if (size === dataSource!.length) {
                allCheckedRefList.current.forEach(item => item?.updateChecked(true));
            } else {
                allCheckedRefList.current.forEach(item => item?.setIndeterminate());
            }

            outerOnChange(
                beforeKeys as string[],
                dataSource!.filter((item: any, index) => {
                    const rowValue =
                        typeof rowKey === 'string'
                            ? item[rowKey]
                            : rowKey
                            ? (rowKey as GetRowKey<T>)(item)
                            : index;
                    return beforeKeys.indexOf(rowValue) > -1;
                }),
            );
        },
        [onChange, dataSource],
    );
    const clearCheckedRows = () => {
        allCheckedRefList.current.forEach(item => item?.updateChecked(false));
        itemsRefList.current.forEach(item => item && item.updateChecked(false));
    };

    const allCheckBoxUnMont = useCallback(value => {
        allCheckedRefList.current.clear(); // 仅存在一个全部checkbox
    }, []);

    const checkBoxUnMont = useCallback(value => {
        itemsRefList.current.delete(value);
    }, []);

    const addRow = useMemo(() => {
        if (!columnWidth) {
            return undefined;
        }
        const isString = typeof rowKey === 'string';
        return {
            title: (
                <OptimizeCheckbox
                    value="all"
                    disabled={dataSource.length === 0}
                    ref={ref => ref && allCheckedRefList.current.set('all', ref)}
                    onChange={onSelectAll}
                    componentWillUnMont={allCheckBoxUnMont}
                />
            ),
            dataIndex: 'checked',
            width: columnWidth,
            align: 'center',
            copyable: false,
            className: styles.rowSelectionRow,
            render: (_, record, index) => {
                const rowValue = isString
                    ? (record as any)[rowKey as string]
                    : rowKey
                    ? (rowKey as GetRowKey<T>)(record)
                    : index;
                return (
                    <OptimizeCheckbox
                        value={rowValue}
                        ref={ref => ref && itemsRefList.current.set(rowValue, ref)}
                        onChange={onChecked}
                        componentWillUnMont={checkBoxUnMont}
                    />
                );
            },
            fixed: fixed ? 'left' : undefined,
        } as ProColumns<T>;
    }, [rowKey, fixed, columnWidth, dataSource]);

    const optimizeColumns = useMemo(() => {
        return columns.length === 0
            ? []
            : addRow
            ? [addRow as ProColumns<T>].concat(columns)
            : columns;
    }, [addRow, columns, dataSource]);

    return !optimize
        ? {
              columns: columns,
              rowSelection: rowSelection,
          }
        : {
              columns: optimizeColumns,
              clearCheckedRows,
          };
}

export { useRowSelection };
