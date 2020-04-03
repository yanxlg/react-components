declare function useModal<T = string>(): {
    visible: false | T;
    onClose: () => void;
    setVisibleProps: (visibleProps: T) => void;
};
export default useModal;
