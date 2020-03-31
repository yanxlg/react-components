import React from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import {numberFormatter} from "../RichInput/utils";

const NumberInput: React.FC<InputNumberProps> = props => {
    return <InputNumber {...props} min={0} formatter={numberFormatter} />;
};

export default NumberInput;
