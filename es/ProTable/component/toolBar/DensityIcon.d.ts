import React from 'react';
export declare type DensitySize = 'middle' | 'small' | 'large' | undefined;
declare interface DensityIconProps {
    tableSize: DensitySize;
    setTableSize: (tableSize: DensitySize) => void;
}
declare const DensityIcon: React.FC<DensityIconProps>;
export default DensityIcon;
