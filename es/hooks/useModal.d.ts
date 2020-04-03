declare function useModal<T = string | boolean>(): {
    visible: false | T;
    onClose: () => void;
    setVisibleProps: (visibleProps: T) => void;
};
export default useModal;
