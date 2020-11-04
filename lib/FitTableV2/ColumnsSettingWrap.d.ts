/// <reference types="react" />
import { IFitTableProps } from './index';
declare const ColumnsSettingWrap: <T extends object = any>({ columns, columnsSettingRender, resetColumnsSetting, onHideKeysChange, hideKeys, ...props }: IFitTableProps<T>) => JSX.Element;
export default ColumnsSettingWrap;
