export function iterator<T extends Object, S = any>(
    data: T,
    render: (key: keyof T, value: T[keyof T]) => S,
) {
    let list: S[] = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            list.push(render(key, data[key]));
        }
    }
    return list;
}
