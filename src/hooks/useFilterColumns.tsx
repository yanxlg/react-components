import { ColumnType } from "antd/es/table";
import React, { useCallback, useState, useMemo, useRef } from "react";
import { Button, Input } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons/lib";
import Highlighter from "react-highlight-words";
import styles from "../ProTable/_index.less";

export type FilterColumns<T> = Omit<ColumnType<T>, "render"> & {
    filterType?: "input";
    render?: (
        text: React.ReactNode,
        record: T,
        index: number,
        filterText?: string,
        dom?: React.ReactNode,
    ) => React.ReactNode | React.ReactNode[];
};

function useFilterColumns<T>(columns: FilterColumns<T>[]): ColumnType<T>[] {
    const [search, setSearch] = useState<{ searchText: string; searchedColumn: string }>({
        searchText: "",
        searchedColumn: "",
    });
    const handleSearch = useCallback((searchText, searchedColumn) => {
        setSearch({
            searchText: searchText,
            searchedColumn: searchedColumn,
        });
    }, []);
    const handleReset = useCallback(searchedColumn => {
        setSearch({
            searchText: "",
            searchedColumn: searchedColumn,
        });
    }, []);

    const searchInputRef = useRef<Input>(null);

    return useMemo<ColumnType<T>[]>(() => {
        return columns.map(column => {
            const { filterType, dataIndex, title, render } = column;
            if (filterType === "input") {
                return {
                    ...column,
                    filterDropdown: ({
                        setSelectedKeys,
                        selectedKeys,
                        confirm,
                        clearFilters,
                    }: FilterDropdownProps) => (
                        <div style={{ padding: 8 }}>
                            <Input
                                ref={searchInputRef}
                                placeholder={`筛选 ${title}`}
                                value={selectedKeys[0]}
                                onChange={e =>
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                }
                                onPressEnter={() => {
                                    confirm();
                                    handleSearch(selectedKeys[0], dataIndex);
                                }}
                                className={styles.tableFilterInput}
                            />
                            <Button
                                type="primary"
                                onClick={() => {
                                    confirm();
                                    handleSearch(selectedKeys[0], dataIndex);
                                }}
                                icon={<SearchOutlined />}
                                size="small"
                                className={styles.tableFilterBtn}
                            >
                                筛选
                            </Button>
                            <Button
                                onClick={() => {
                                    clearFilters?.();
                                    handleReset(dataIndex);
                                }}
                                size="small"
                                className={styles.tableFilterBtn}
                            >
                                清空
                            </Button>
                        </div>
                    ),
                    filterIcon: (filtered: boolean) => (
                        <SearchOutlined className={filtered ? styles.tableIconActive : undefined} />
                    ),
                    onFilter: (value: string, record: any) => {
                        const showText = record.hasOwnProperty("__" + dataIndex)
                            ? record["__" + dataIndex]
                            : record[dataIndex as any];
                        return showText
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase());
                    },
                    onFilterDropdownVisibleChange: (visible: boolean) => {
                        if (visible) {
                            setTimeout(() => searchInputRef.current?.select());
                        }
                    },
                    render: (text: any, record: T, index: number, dom?: React.ReactNode) =>
                        search.searchedColumn === dataIndex ? (
                            render ? (
                                render(text, record, index, search.searchText, dom)
                            ) : (
                                <Highlighter
                                    highlightClassName={styles.tableHighlight}
                                    searchWords={[search.searchText]}
                                    autoEscape
                                    textToHighlight={text.toString()}
                                />
                            )
                        ) : (
                            render?.(text, record, index, undefined, dom) ?? text
                        ),
                };
            } else {
                return column;
            }
        }) as ColumnType<T>[];
    }, [columns]);
}

export default useFilterColumns;
