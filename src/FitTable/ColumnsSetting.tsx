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

    const cacheColumnsShowList = useRef<string[]>([]);
    const [columnsShowList, setColumnsShowList] = useState<string[]>(
        columns.map(column => column.dataIndex as string),
    ); // 列

    // 重新初始化
    useEffect(() => {
        const keys = columns.map(column => column.dataIndex as string);
        cacheColumnsShowList.current = keys;
        setColumnsShowList(keys);
    }, [columns]);

    // drop修改
    useEffect(() => {
        if (visible) {
            setColumnsShowList(cacheColumnsShowList.current);
        }
    }, [visible]);

    const onChange = useCallback((checkedValue: Array<CheckboxValueType>) => {
        setColumnsShowList(checkedValue as string[]);
    }, []);

    const onSave = useCallback(() => {
        cacheColumnsShowList.current = columnsShowList;
        let list: { [key: string]: true } = {};
        columnsShowList.map(value => {
            list[value] = true;
        });
        filterColumns(
            columns.filter(column => {
                return list[column.dataIndex as string];
            }),
        );
        onClose();
    }, [columnsShowList, columns]);

    const modal = useMemo(() => {
        return (
            <Modal
                title="自定义字段展示"
                cancelText="不保存"
                okText="保存"
                onOk={onSave}
                onCancel={onClose}
                visible={!!visible}
                className={styles.settingModal}
            >
                <Checkbox.Group onChange={onChange} value={columnsShowList}>
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
    }, [visible, columnsShowList]);

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
    }, [visible, columnsShowList]);
};

export default ColumnsSetting;
