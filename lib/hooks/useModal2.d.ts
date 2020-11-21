declare function useModal2<T = string | boolean>(): [T | false, (visible: T) => void, () => void];
export default useModal2;
