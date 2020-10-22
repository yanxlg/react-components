import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Checkbox, Col, Modal, Row } from 'antd';
import useModal from '../hooks/useModal';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styles from './_index.less';
import { TableProps } from 'antd/es/table';
import { getColumnKey } from './index';

export declare interface ColumnsSettingProps<T> {
    columns: TableProps<T>['columns'];
    onHideKeysChange: (keys: string[]) => void;
    resetColumnsSetting?: boolean;
    hideKeys?: string[];
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
    onHideKeysChange,
    hideKeys,
}: ColumnsSettingProps<T>) => {
    const { visible, setVisibleProps, onClose } = useModal();

    const cacheColumnsShowList = useRef<string[]>([]);

    const [columnsShowList, setColumnsShowList] = useState<string[]>(
        columns
            .filter(column => !column.defaultHide)
            .map(column => getColumnKey(column))
            .filter(key => {
                return !hideKeys || hideKeys.indexOf(key) === -1;
            }),
    );

    const _setColumnsShowList = useCallback(
        keys => {
            setColumnsShowList(keys);
        },
        [columns],
    );

    // 重新初始化
    useEffect(() => {
        const keys = columns
            .map(column => getColumnKey(column))
            .filter(key => {
                return !hideKeys || hideKeys.indexOf(key) === -1;
            });
        cacheColumnsShowList.current = keys;
        _setColumnsShowList(keys);
    }, [columns, hideKeys]);

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
        onHideKeysChange(
            columns
                .filter(column => {
                    return !list[getColumnKey(column) as string];
                })
                .map(item => getColumnKey(item)),
        );
        onClose();
    }, [columnsShowList, columns]);

    const onCancel = useCallback(() => {
        if (resetColumnsSetting) {
            //重置
            const keys = columns.map(column => getColumnKey(column));
            cacheColumnsShowList.current = keys;
            _setColumnsShowList(keys);
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
                    <Checkbox.Group
                        onChange={onChange}
                        value={columnsShowList}
                        className={styles.checkoutGroup}
                    >
                        <Row gutter={[0, 5]}>
                            {columns.map(column => {
                                const key = getColumnKey(column);
                                return (
                                    <Col span={4} key={key}>
                                        <Checkbox value={key}>{column.title}</Checkbox>
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
