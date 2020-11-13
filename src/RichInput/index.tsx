import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { InputProps } from 'antd/es/input';
import { Input } from 'antd';
import {
    intFormatter,
    naturalNumber,
    numberFormatter,
    numberSplit,
    positiveIntFormatter,
} from './utils';

export type RichType =
    | 'input'
    | 'integer'
    | 'number'
    | 'positiveInteger'
    | 'numberSplit'
    | 'naturalNumber';

declare interface RichInputProps extends InputProps {
    richType?: RichType;
    precision?: number; // 数字浮点精度
    maxDigits?: number; // 整数的最大位数
}

const RichInput: React.FC<RichInputProps> = ({
    richType,
    precision,
    maxDigits,
    value,
    onChange,
    ...props
}) => {
    const [innerValue, setInnerValue] = useState('');

    const onInnerChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const _value = e.target.value;
            if (richType) {
                let parseValue =
                    richType === 'number'
                        ? precision === 0
                            ? intFormatter(_value)
                            : numberFormatter(_value)
                        : richType === 'integer'
                        ? intFormatter(_value)
                        : richType === 'input'
                        ? _value
                        : richType === 'positiveInteger'
                        ? positiveIntFormatter(_value)
                        : richType === 'numberSplit'
                        ? numberSplit(_value)
                        : richType === 'naturalNumber'
                        ? naturalNumber(_value)
                        : _value;
                if (precision) {
                    // 精度计算
                    const regexp = new RegExp(`^\\d+(?:\\.\\d{0,${precision}})?`);
                    parseValue = (parseValue.match(regexp) || [''])[0];
                }
                if (maxDigits && Number(parseValue) > Math.pow(10, maxDigits)) {
                    // 保留整数位数为设置的长度
                    parseValue = String(parseValue).slice(0, -1);
                }
                e.target.value = parseValue;
            }
            if (value === void 0) {
                setInnerValue(e.target.value);
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
