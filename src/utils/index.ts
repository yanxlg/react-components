export const isEmptyObject = (target: object) => {
    return Object.keys(target).length === 0;
};

export const EmptyObject: { [key: string]: any } = {};
export const EmptyArray: any[] = [];

export function isNumber(value?: string | number) {
    return /^\d+$/.test(String(value));
}

export const isEmptyString = (value: any) => typeof value === 'string' && value.trim() === '';

export const clearEmptyVal = (data: any, excludeKeys?: string[]): any => {
    // formData直接返回
    if (typeof data !== 'object' || data instanceof FormData) {
        return data;
    }
    if (Array.isArray(data)) {
        return data
            .filter(item => {
                return !isEmptyString(item) && item !== undefined && item !== null;
            })
            .map(item => clearEmptyVal(item));
    } else {
        let result = {} as any;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key];
                if (excludeKeys && excludeKeys.includes(key)) {
                    result[key] = val;
                } else if (!isEmptyString(val) && val !== undefined && val !== null) {
                    result[key] = clearEmptyVal(val);
                }
            }
        }
        return result;
    }
};
