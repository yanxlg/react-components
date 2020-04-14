declare function useInterval(): {
    /**
     *
     * @param handler 定时处理逻辑，不可变，如果实例根据状态变化需要调用stop后重新start
     * @param timeout 定时时长
     * @param execute 是否立即执行
     */
    start: (handler: () => void, timeout: number, execute?: boolean) => void;
    stop: () => void;
};
export default useInterval;
