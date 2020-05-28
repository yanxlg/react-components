declare function useModal2<T = string | boolean>(): (false | T | ((visible: T) => void))[];
export default useModal2;
