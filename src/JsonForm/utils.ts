export const isNull = function(value: any) {
    return value === null || value === void 0;
};

export function transNullValue(value?: any) {
    return value === "" || isNull(value) ? undefined : value;
}

export function transJoinStr(value?: any) {
    return value && value.length ? value.join(",") : undefined;
}

export function transNumber(value?: any) {
    const _value =
        typeof value === "string"
            ? value === ""
                ? undefined
                : Number(value)
            : typeof value === "number"
            ? value
            : undefined;
    return _value && isNaN(_value) ? undefined : _value;
}

export function transStrArr(value: string | undefined): string[] | undefined {
    if (typeof value === "string") {
        return value
            .replace(/(^\s*)|(\s*$)/g, "")
            .split(",")
            .filter(str => str);
    }
    return value as undefined;
}

export function transNumberStrArr(value: string | undefined): string[] | undefined {
    if (typeof value === "string") {
        return value
            .replace(/(^\s*)|(\s*$)/g, "")
            .split(",")
            .filter(str => str && !/[^0-9\,]/g.test(str));
    }
    return value as undefined;
}
