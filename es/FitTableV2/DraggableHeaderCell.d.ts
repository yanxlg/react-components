import React, { HTMLAttributes } from 'react';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
interface IDraggableHeaderCellProps extends HTMLAttributes<HTMLTableHeaderCellElement> {
    index: number;
    column: ColumnType<any> | ColumnGroupType<any>;
    moveColumn: (from: number, to: number) => void;
    hideColumn: (key: string) => void;
}
declare const type = "DraggableHeaderTitle";
declare const DraggableHeaderCell: React.FC<IDraggableHeaderCellProps>;
export default DraggableHeaderCell;
export { type };
