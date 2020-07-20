import React, { HTMLAttributes } from 'react';
interface IDraggableHeaderCellProps extends HTMLAttributes<HTMLTableHeaderCellElement> {
    index: number;
    moveColumn: (from: number, to: number) => void;
}
declare const type = "DraggableHeaderTitle";
declare const DraggableHeaderCell: React.FC<IDraggableHeaderCellProps>;
export default DraggableHeaderCell;
export { type };
