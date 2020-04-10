import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Checkbox, Col, Modal, Row } from 'antd';
import useModal from '../hooks/useModal';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styles from './_index.less';
import { TableProps } from 'antd/es/table';

export declare interface ColumnsSettingProps<T> {
    columns: TableProps<T>['columns'];
    onColumnsChange: (columns: TableProps<T>['columns']) => void;
    resetColumnsSetting?: boolean;
    columnsSettingRender:
        | true
        | React.ComponentClass<{ onChange: (checkedValue: Array<CheckboxValueType>) => void }>
        | React.FC<{ onChange: (checkedValue: Array<CheckboxValueType>) => void }>;
}

const ColumnsSetting = <T,>({
    columns,
    columnsSettingRender: ColumnsSettingRender,
    resetColumnsSetting,
    onColumnsChange,
}: ColumnsSettingProps<T>) => {
    const { visible, setVisibleProps, onClose } = useModal();

    const cacheColumnsShowList = useRef<string[]>([]);

    const [columnsShowList, setColumnsShowList] = useState<string[]>(
        columns.map(column => column['dataIndex'] as string),
    ); // 列

    // 重新初始化
    useEffect(() => {
        const keys = columns.map(column => column['dataIndex'] as string);
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
        onColumnsChange(
            columns.filter(column => {
                return list[column['dataIndex'] as string];
            }),
        );
        onClose();
    }, [columnsShowList, columns]);

    const onCancel = useCallback(() => {
        if (resetColumnsSetting) {
            //重置
            const keys = columns.map(column => column['dataIndex'] as string);
            cacheColumnsShowList.current = keys;
            setColumnsShowList(keys);
            onColumnsChange(columns);
            onClose();
        } else {
            onClose();
        }
    }, []);

    const modal = useMemo(() => {
        return (
            <Modal
                title="自定义字段展示"
                cancelText={resetColumnsSetting ? '还原默认' : '不保存'}
                okText="保存"
                onOk={onSave}
                onCancel={onCancel}
                visible={!!visible}
                className={styles.settingModal}
            >
                {ColumnsSettingRender === true ? (
                    <Checkbox.Group onChange={onChange} value={columnsShowList}>
                        <Row gutter={[0, 5]}>
                            {columns.map(column => {
                                const dataIndex = column['dataIndex'] as string;
                                return (
                                    <Col span={4} key={dataIndex}>
                                        <Checkbox value={dataIndex}>{column.title}</Checkbox>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Checkbox.Group>
                ) : (
                    <ColumnsSettingRender onChange={onChange} />
                )}
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
