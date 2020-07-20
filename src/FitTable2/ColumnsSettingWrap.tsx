import React, { useMemo } from 'react';
import FitTable, { IFitTableProps } from './index';
import ColumnsSetting from './ColumnsSetting';
import styles from './_index.less';

// columns => sort => filter

const ColumnsSettingWrap = <T extends object = any>({
    columns,
    columnsSettingRender,
    resetColumnsSetting,
    onHideKeysChange,
    hideKeys,
    ...props
}: IFitTableProps<T>) => {
    return useMemo(() => {
        return (
            <div className={styles.relative}>
                <FitTable<T>
                    {...props}
                    columns={columns}
                    hideKeys={hideKeys}
                    // @ts-ignore
                    settingComponent={
                        <ColumnsSetting
                            columnsSettingRender={columnsSettingRender}
                            columns={columns}
                            hideKeys={hideKeys}
                            onHideKeysChange={onHideKeysChange}
                            resetColumnsSetting={resetColumnsSetting}
                        />
                    }
                />
            </div>
        );
    }, [props, columns, hideKeys]);
};

export default ColumnsSettingWrap;
