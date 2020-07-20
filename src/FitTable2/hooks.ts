import { RefObject, useEffect, useMemo, useState } from 'react';
import { ProColumns } from '../_Deprecated/ProTable';
import { SimpleRowSelection } from '../_Deprecated/ProTable/Table';
import debounce from 'lodash/debounce';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import { ColumnsType } from 'antd/lib/table/interface';

function useScrollXY<T>(
    containerRef: RefObject<HTMLElement>,
    bottom: number,
    minHeight: number,
    autoFitY: boolean,
    columns: ProColumns<T>[] | ColumnsType<T>,
    rowSelection: SimpleRowSelection<T> | undefined,
    scroll?: RcTableProps<T>['scroll'] & {
        scrollToFirstRowOnChange?: boolean;
    },
) {
    const [y, setY] = useState<number | undefined | string>(scroll?.y);

    const scrollX = useMemo(() => {
        if (scroll?.x === true || scroll?.x === 'max-content') {
            let x: number = 0;
            if (rowSelection && rowSelection.columnWidth) {
                x += parseInt(rowSelection.columnWidth as string) || 0;
            }
            columns?.forEach((column: any) => {
                // 支持表头分组
                if (column['children']) {
                    column['children'].map((item: any) => {
                        x += parseInt(item.width as string) || 0;
                    });
                } else {
                    x += parseInt(column.width as string) || 0;
                }
            });
            return x;
        } else {
            return scroll?.x;
        }
    }, [columns, rowSelection, scroll?.x]);

    useEffect(() => {
        const resizeHeight = debounce(() => {
            const el = containerRef.current!;
            const height = document.body.offsetHeight - el.getBoundingClientRect().top - bottom;
            if ((!minHeight || height >= minHeight) && height > 0) {
                setY(height);
            } else if (minHeight) {
                setY(minHeight);
            }
        }, 300);

        if (autoFitY) {
            resizeHeight();
            window.addEventListener('resize', resizeHeight);
        }
        return () => {
            window.removeEventListener('resize', resizeHeight);
        };
    }, []);

    return useMemo(() => {
        return {
            scrollToFirstRowOnChange: true,
            ...scroll,
            y: y,
            x: scrollX,
        };
    }, [scrollX, scroll, y]);
}

export { useScrollXY };
