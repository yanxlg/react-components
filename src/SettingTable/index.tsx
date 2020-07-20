import React, { useMemo } from 'react';
import FitTable, { IFitTableProps } from '../FitTable2';
import useTableSetting from '../hooks/useTableSetting';

interface SettingTableProps<T> extends IFitTableProps<T> {
    settingKey: string;
}

function SettingTable<T extends object = any>({ settingKey, ...props }: SettingTableProps<T>) {
    const { hideKeys, sortKeys, updateHideKeys, updateSortKeys } = useTableSetting(settingKey);
    return useMemo(
        () => (
            <FitTable<T>
                columnsSettingRender={true}
                bordered={true}
                hideKeys={hideKeys}
                sortKeys={sortKeys}
                onHideKeysChange={updateHideKeys}
                onSortKeysChange={updateSortKeys}
                {...props}
            />
        ),
        [hideKeys, sortKeys, props],
    );
}

export default SettingTable;
