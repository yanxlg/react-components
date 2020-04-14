function addOn<T = any>(init: T) {
    const plugin: any = {
        ...init,
        extend: extend,
    };
    function extend(extend: Partial<T>) {
        for (let key in extend) {
            plugin[key] = extend[key];
        }
    }
    return plugin as T & { extend: (extend: Partial<T>) => void };
}

export default addOn;
