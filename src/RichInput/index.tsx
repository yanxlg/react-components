import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { InputProps } from 'antd/es/input';
import { Input } from 'antd';
import {intFormatter, numberFormatter, positiveIntFormatter} from "./utils";

export type RichType = 'input' | 'integer' | 'number' | 'positiveInteger';

declare interface RichInputProps extends InputProps {
    richType?: RichType;
}

const RichInput: React.FC<RichInputProps> = ({ richType, value, onChange, ...props }) => {
    const [innerValue, setInnerValue] = useState('');

    const onInnerChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const _value = e.target.value;
            if (richType) {
                const targetValue =
                    richType === 'number'
                        ? numberFormatter(_value)
                        : richType === 'integer'
                        ? intFormatter(_value)
                        : richType === 'input'
                        ? _value
                        : richType === 'positiveInteger'
                        ? positiveIntFormatter(_value)
                        : _value;
                e.target.value = targetValue;
            }
            if (value === void 0) {
                setInnerValue(_value);
                onChange && onChange(e);
            } else {
                onChange && onChange(e);
            }
        },
        [value, onChange, richType],
    );

    const showValue = value !== void 0 ? value : innerValue;

    return useMemo(() => {
        return <Input value={showValue} allowClear={true} {...props} onChange={onInnerChange} />;
    }, [props, showValue, onInnerChange]);
};

export default RichInput;
