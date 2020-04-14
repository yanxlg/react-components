declare function addOn<T = any>(init: T): T & {
    extend: (extend: Partial<T>) => void;
};
export default addOn;
