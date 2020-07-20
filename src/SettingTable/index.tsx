import React from 'react';
import FitTable, { IFitTableProps } from '../FitTable2';
import useTableSetting from '../hooks/useTableSetting';

interface SettingTableProps<T> extends IFitTableProps<T> {
    settingKey: string;
}

function SettingTable<T extends object = any>({ settingKey, ...props }: SettingTableProps<T>) {
    const { hideKeys, sortKeys, updateHideKeys, updateSortKeys } = useTableSetting(settingKey);
    return (
        <FitTable<T>
            columnsSettingRender={true}
            bordered={true}
            hideKeys={hideKeys}
            sortKeys={sortKeys}
            onHideKeysChange={updateHideKeys}
            onSortKeysChange={updateSortKeys}
            {...props}
        />
    );
}

export default React.memo(SettingTable);
