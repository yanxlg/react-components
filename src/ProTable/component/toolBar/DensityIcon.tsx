import React, { useMemo } from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Tooltip } from 'antd';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

declare interface DensityIconProps {
    tableSize: DensitySize;
    setTableSize: (tableSize: DensitySize) => void;
}

const DensityIcon: React.ForwardRefRenderFunction<Dropdown, DensityIconProps> = (
    { tableSize, setTableSize },
    ref,
) => {
    return useMemo(() => {
        return (
            <Dropdown
                ref={ref}
                overlay={
                    <Menu
                        selectedKeys={[tableSize as string]}
                        onClick={({ key }) => {
                            setTableSize(key as DensitySize);
                        }}
                        style={{
                            width: 80,
                        }}
                    >
                        <Menu.Item key="large">
                            默认
                        </Menu.Item>
                        <Menu.Item key="middle">
                            中等
                        </Menu.Item>
                        <Menu.Item key="small">
                            紧凑
                        </Menu.Item>
                    </Menu>
                }
                trigger={['click']}
            >
                <Tooltip title={'表格密度'}>
                    <ColumnHeightOutlined />
                </Tooltip>
            </Dropdown>
        );
    }, [tableSize, setTableSize]);
};

export default React.forwardRef(DensityIcon);
