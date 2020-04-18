import { useCallback, useEffect, useRef } from 'react';

function useInterval() {
    const timer = useRef<number>();
    const stop = useCallback(() => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = undefined;
        }
    }, []);

    const start = useCallback(
        /**
         *
         * @param handler {Function} 定时处理逻辑，不可变，如果实例根据状态变化需要调用stop后重新start
         * @param timeout {Number} 定时时长
         * @param execute {Boolean} 是否立即执行
         */
        (handler: () => void, timeout: number, execute: boolean = true) => {
            stop();
            execute && handler();
            timer.current = window.setInterval(handler, timeout);
        },
        [],
    );

    useEffect(() => {
        return () => {
            stop();
        };
    }, []);

    return {
        /**
         *
         */
        start,
        stop,
    };
}

export default useInterval;
