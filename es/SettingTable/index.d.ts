import React from 'react';
import { IFitTableProps } from '../FitTable2';
interface SettingTableProps<T> extends IFitTableProps<T> {
    settingKey: string;
}
declare function SettingTable<T extends object = any>({ settingKey, ...props }: SettingTableProps<T>): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof SettingTable>;
export default _default;
