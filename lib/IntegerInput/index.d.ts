import React from "react";
import { InputNumberProps } from "antd/lib/input-number";
declare interface IIntegerInputProps extends InputNumberProps {
    positive?: boolean;
}
declare const IntegerInput: React.FC<IIntegerInputProps>;
export default IntegerInput;
