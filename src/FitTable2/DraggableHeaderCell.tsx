import React, { HTMLAttributes, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './_index.less';
import classNames from 'classnames';
import { DragObjectWithType } from 'react-dnd/lib/interfaces';
import { StopOutlined } from '@ant-design/icons';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { getColumnKey } from './index';
import { Tooltip } from 'antd';

interface IDraggableHeaderCellProps extends HTMLAttributes<HTMLTableHeaderCellElement> {
    index: number;
    column: ColumnType<any> | ColumnGroupType<any>;
    moveColumn: (from: number, to: number) => void;
    hideColumn: (key: string) => void;
}

interface IDragObject extends DragObjectWithType {
    index: number;
}

const type = 'DraggableHeaderTitle';

const DraggableHeaderCell: React.FC<IDraggableHeaderCellProps> = ({
    index,
    moveColumn,
    className,
    style,
    children,
    hideColumn,
    column,
    ...restProps
}) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop<IDragObject, any, any>({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? styles.dropOverRight : styles.dropOverLeft,
            };
        },
        drop: item => {
            moveColumn(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const onHideColumn = useCallback(() => {
        const key = getColumnKey(column);
        hideColumn(key);
    }, []);

    if (index === void 0) {
        return (
            <th className={className} style={style} {...restProps}>
                {children}
            </th>
        );
    }
    drop(drag(ref));
    return (
        <th
            ref={ref}
            className={classNames(
                className,
                {
                    [dropClassName]: isOver,
                },
                styles.th,
            )}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        >
            {children}
            <Tooltip title="隐藏该列">
                <StopOutlined className={styles.hideIcon} onClick={onHideColumn} />
            </Tooltip>
        </th>
    );
};

export default DraggableHeaderCell;

export { type };
