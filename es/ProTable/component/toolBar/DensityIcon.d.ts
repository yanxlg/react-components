import React from "react";
import { Dropdown } from "antd";
export declare type DensitySize = "middle" | "small" | "large" | undefined;
declare interface DensityIconProps {
    tableSize: DensitySize;
    setTableSize: (tableSize: DensitySize) => void;
}
declare const _default: React.ForwardRefExoticComponent<DensityIconProps &
    React.RefAttributes<Dropdown>>;
export default _default;
