declare const useTableSetting: (
    settingKey: string,
    version?: string,
) => {
    settingKey: string;
    hideKeys: string[];
    sortKeys: string[];
    updateHideKeys: (hideKeys?: string[]) => void;
    updateSortKeys: (sortKeys?: string[]) => void;
};
export default useTableSetting;
