import React, { useMemo } from 'react';
import FitTable, { IFitTableProps } from '../FitTable2';
import useTableSetting from '../hooks/useTableSetting';

interface SettingTableProps<T> extends IFitTableProps<T> {
    settingKey: string;
    settingVersion?: string;
}

function SettingTable<T extends object = any>({
    settingKey,
    settingVersion,
    ...props
}: SettingTableProps<T>) {
    const { hideKeys, sortKeys, updateHideKeys, updateSortKeys } = useTableSetting(
        settingKey,
        settingVersion,
    );
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
