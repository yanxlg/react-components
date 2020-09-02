import { GetRowKey } from 'antd/es/table/interface';
import { ProColumns, SimpleRowSelection } from './Table';
declare function useRowSelection<T, U>(
    columns: ProColumns<T>[],
    rowKey: string | GetRowKey<T>,
    dataSource: T[],
    rowSelection: SimpleRowSelection<T>,
    optimize: boolean,
    onSelectedRowKeysUpdate: (selectedRowKeys: (string | number)[]) => void,
):
    | {
          columns: ProColumns<T>[];
          rowSelection: Pick<
              import('antd/es/table/interface').TableRowSelection<T>,
              | 'onChange'
              | 'checkStrictly'
              | 'fixed'
              | 'selectedRowKeys'
              | 'preserveSelectedRowKeys'
              | 'hideSelectAll'
              | 'columnWidth'
              | 'renderCell'
          >;
          clearCheckedRows?: undefined;
      }
    | {
          columns: ProColumns<T>[];
          clearCheckedRows: () => void;
          rowSelection?: undefined;
      };
export { useRowSelection };
