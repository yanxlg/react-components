import React from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { TableProps } from 'antd/es/table';
export declare interface ColumnsSettingProps<T> {
    columns: TableProps<T>['columns'];
    onColumnsChange: (columns: TableProps<T>['columns']) => void;
    resetColumnsSetting?: boolean;
    columnsSettingRender: true | React.ComponentClass<{
        onChange: (checkedValue: Array<CheckboxValueType>) => void;
    }> | React.FC<{
        onChange: (checkedValue: Array<CheckboxValueType>) => void;
    }>;
}
declare const ColumnsSetting: <T>({ columns, columnsSettingRender: ColumnsSettingRender, resetColumnsSetting, onColumnsChange, }: ColumnsSettingProps<T>) => JSX.Element;
export default ColumnsSetting;
