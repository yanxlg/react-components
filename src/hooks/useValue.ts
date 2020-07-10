import { useRef } from 'react';

const useValue = (value: any) => {
    const valueRef = useRef<any>(value);
    if (value) {
        valueRef.current = value;
    }
    return valueRef.current;
};

export default useValue;
