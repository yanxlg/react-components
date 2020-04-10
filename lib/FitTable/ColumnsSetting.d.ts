/// <reference types="react" />
import { ColumnType } from 'antd/lib/table/interface';
declare interface ColumnsSettingProps<T> {
    columns: Array<ColumnType<T>>;
    filterColumns: (columns: Array<ColumnType<T>>) => void;
}
declare const ColumnsSetting: <T>({ columns, filterColumns }: ColumnsSettingProps<T>) => JSX.Element;
export default ColumnsSetting;
