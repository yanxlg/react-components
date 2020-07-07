import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useUpdate = (effect: EffectCallback, deps: DependencyList) => {
    const valueRef = useRef<any>(Symbol());

    useEffect(() => {
        if (typeof valueRef.current === 'symbol') {
            // 初始化，跳过
            valueRef.current = deps;
        } else {
            return effect();
        }
    }, deps);
};

export default useUpdate;
