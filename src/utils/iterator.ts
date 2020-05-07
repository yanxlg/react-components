export function iterator<T extends Object>(
    data: T,
    render: (key: keyof T, value: T[keyof T]) => any,
) {
    let list: any[] = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            list.push(render(key, data[key]));
        }
    }
    return list;
}
