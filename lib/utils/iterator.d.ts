export declare function iterator<T extends Object>(
    data: T,
    render: (key: keyof T, value: T[keyof T]) => any,
): any[];
