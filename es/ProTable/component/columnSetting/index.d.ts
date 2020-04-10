/// <reference types="react" />
import { ProColumns, ColumnsState } from '../../Table';
import './index.less';
export interface ColumnSettingProps<T = any> {
    columns: ProColumns<T>[];
    columnsMap: {
        [key: string]: ColumnsState;
    };
    setColumnsMap: (map: {
        [key: string]: ColumnsState;
    }) => void;
    setSortKeyColumns: (sortedColumns: (string | number)[]) => void;
    sortKeyColumns: (string | number)[];
}
declare const ColumnSetting: <T, U = {}>(props: ColumnSettingProps<T>) => JSX.Element;
export default ColumnSetting;
