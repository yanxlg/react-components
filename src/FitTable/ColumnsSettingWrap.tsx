import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FitTable, { IFitTableProps } from './index';
import ColumnsSetting from './ColumnsSetting';
import { TableProps } from 'antd/es/table';
import styles from './_index.less';

const ColumnsSettingWrap = <T extends object = any>({
    columns,
    columnsSettingRender,
    resetColumnsSetting,
    ...props
}: IFitTableProps<T>) => {
    const filterColumns = useRef<TableProps<T>['columns']>(columns);
    filterColumns.current = columns;
    const [reload, setReload] = useState(false);

    const setFilterColumns = useCallback(
        columns => {
            filterColumns.current = columns;
            setReload(!reload);
        },
        [reload],
    );

    useEffect(() => {
        setFilterColumns(columns);
    }, [columns]);

    return useMemo(() => {
        return (
            <div className={styles.relative}>
                <ColumnsSetting
                    columnsSettingRender={columnsSettingRender}
                    columns={columns}
                    onColumnsChange={setFilterColumns}
                    resetColumnsSetting={resetColumnsSetting}
                />
                <FitTable<T> {...props} columns={filterColumns.current!} />
            </div>
        );
    }, [reload, props, filterColumns.current]);
};

export default ColumnsSettingWrap;
