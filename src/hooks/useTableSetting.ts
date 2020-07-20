import { useLocalStorageState } from '@umijs/hooks';
import { useCallback, useMemo } from 'react';

interface ITableSettingItem {
    hideKeys?: string[];
    sortKeys?: string[];
    version: string;
}

interface ITableSetting {
    [key: string]: ITableSettingItem;
}

const compareVersion = (setting?: ITableSettingItem, version: string = '') => {
    const lastVersion = setting?.version;
    return !lastVersion || lastVersion === version;
};

const useTableSetting = (settingKey: string, version: string = '1.0') => {
    const [allSetting, setAllSetting] = useLocalStorageState<ITableSetting | undefined>(
        '_table_config',
        undefined,
    );

    const setting = useMemo(() => {
        return allSetting?.[settingKey];
    }, [allSetting]);

    const updateHideKeys = useCallback((hideKeys?: string[]) => {
        setAllSetting(allSetting => {
            const setting = allSetting?.[settingKey];
            const compareV = compareVersion(setting, version);
            return {
                ...allSetting,
                [settingKey]: {
                    sortKeys: compareV ? setting?.sortKeys : undefined,
                    hideKeys,
                    version,
                },
            };
        });
    }, []);

    const updateSortKeys = useCallback((sortKeys?: string[]) => {
        setAllSetting(allSetting => {
            const setting = allSetting?.[settingKey];
            const compareV = compareVersion(setting, version);
            return {
                ...allSetting,
                [settingKey]: {
                    hideKeys: compareV ? setting?.hideKeys : undefined,
                    sortKeys,
                    version,
                },
            };
        });
    }, []);

    const compareV = compareVersion(setting, version);

    return useMemo(() => {
        return {
            settingKey,
            hideKeys: compareV ? setting?.hideKeys : undefined,
            sortKeys: compareV ? setting?.sortKeys : undefined,
            updateHideKeys: updateHideKeys,
            updateSortKeys: updateSortKeys,
        };
    }, [allSetting]);
};

export default useTableSetting;
