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
        | React.ComponentClass<{
              value: Array<CheckboxValueType>;
              onChange: (checkedValue: Array<CheckboxValueType>) => void;
          }>
        | React.FC<{
              value: Array<CheckboxValueType>;
              onChange: (checkedValue: Array<CheckboxValueType>) => void;
          }>;
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
        columns.filter(column => !column.defaultHide).map(column => column['dataIndex'] as string),
    ); // 列

    const _setColumnsShowList = useCallback(
        (keys) => {
            // console.log(1111, keys)
            setColumnsShowList([
                columns?.filter(item => item.hideInSetting).map(item => item['dataIndex']),
                ...keys
            ])
        },
        [columns]
    )

    // 重新初始化
    useEffect(() => {
        const keys = columns.filter(column => !column.defaultHide).map(column => column['dataIndex'] as string);
        cacheColumnsShowList.current = keys;
        _setColumnsShowList(keys);
    }, [columns]);

    // drop修改
    useEffect(() => {
        if (visible) {
            _setColumnsShowList(cacheColumnsShowList.current);
        }
    }, [visible]);

    const onChange = useCallback((checkedValue: Array<CheckboxValueType>) => {
        _setColumnsShowList(checkedValue as string[]);
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
            _setColumnsShowList(keys);
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
                                if (column.hideInSetting) {
                                    return null;
                                }
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
                    <ColumnsSettingRender value={columnsShowList} onChange={onChange} />
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
