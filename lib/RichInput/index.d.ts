import React from 'react';
import { InputProps } from 'antd/es/input';
export declare type RichType = 'input' | 'integer' | 'number' | 'positiveInteger' | 'numberSplit' | 'naturalNumber';
declare interface RichInputProps extends InputProps {
    richType?: RichType;
    precision?: number;
    maxDigits?: number;
}
declare const RichInput: React.FC<RichInputProps>;
export default RichInput;
