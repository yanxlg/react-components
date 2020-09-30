export declare function iterator<T extends Object, S = any>(
    data: T,
    render: (key: keyof T, value: T[keyof T]) => S,
): S[];
