import React from 'react';
import { InputProps } from 'antd/es/input';
export declare type RichType = 'input' | 'integer' | 'number' | 'positiveInteger';
declare interface RichInputProps extends InputProps {
    richType?: RichType;
}
declare const RichInput: React.FC<RichInputProps>;
export default RichInput;
