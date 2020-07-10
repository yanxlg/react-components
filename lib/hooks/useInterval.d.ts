declare function useInterval(): {
    /**
     *
     */
    start: (handler: () => void, timeout: number, execute?: boolean) => void;
    stop: () => void;
};
export default useInterval;
