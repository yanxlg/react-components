import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Checkbox, Col, Modal, Row } from 'antd';
import useModal from '../hooks/useModal';
import { ColumnType } from 'antd/lib/table/interface';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styles from './_index.less';

declare interface ColumnsSettingProps<T> {
    columns: Array<ColumnType<T>>;
    filterColumns: (columns: Array<ColumnType<T>>) => void;
}

const ColumnsSetting = <T,>({ columns, filterColumns }: ColumnsSettingProps<T>) => {
    const { visible, setVisibleProps, onClose } = useModal();

    const cacheColumnsHideList = useRef<string[]>([]);
    const [columnsHideList, setColumnsHideList] = useState<string[]>([]); // 列

    // 重新初始化
    useEffect(() => {
        cacheColumnsHideList.current = [];
        setColumnsHideList([]);
    }, [columns]);

    // drop修改
    useEffect(() => {
        if (visible) {
            setColumnsHideList(cacheColumnsHideList.current);
        }
    }, [visible]);

    const onChange = useCallback((checkedValue: Array<CheckboxValueType>) => {
        setColumnsHideList(checkedValue as string[]);
    }, []);

    const onSave = useCallback(() => {
        cacheColumnsHideList.current = columnsHideList;
        let list: { [key: string]: true } = {};
        columnsHideList.map(value => {
            list[value] = true;
        });
        filterColumns(
            columns.filter(column => {
                return !list[column.dataIndex as string];
            }),
        );
        onClose();
    }, [columnsHideList, columns]);

    const modal = useMemo(() => {
        return (
            <Modal
                title="自定义字段展示"
                cancelText="还原默认"
                okText="保存"
                onOk={onSave}
                onCancel={onClose}
                visible={!!visible}
            >
                <Checkbox.Group onChange={onChange} value={columnsHideList}>
                    <Row>
                        {columns.map(column => {
                            return (
                                <Col span={4} key={column.dataIndex as string}>
                                    <Checkbox value={column.dataIndex}>{column.title}</Checkbox>
                                </Col>
                            );
                        })}
                    </Row>
                </Checkbox.Group>
            </Modal>
        );
    }, [visible, columnsHideList]);

    const showModal = useCallback(() => {
        setVisibleProps(true);
    }, []);

    return useMemo(() => {
        return (
            <>
                <Button className={styles.settingBtn} size="small" onClick={showModal}>
                    自定义展示字段
                </Button>
                {modal}
            </>
        );
    }, [visible, columnsHideList]);
};

export default ColumnsSetting;
