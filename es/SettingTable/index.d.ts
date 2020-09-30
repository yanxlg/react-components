/// <reference types="react" />
import { IFitTableProps } from '../FitTableV2';
interface SettingTableProps<T> extends IFitTableProps<T> {
    settingKey: string;
    settingVersion?: string;
}
declare function SettingTable<T extends object = any>({
    settingKey,
    settingVersion,
    ...props
}: SettingTableProps<T>): JSX.Element;
export default SettingTable;
