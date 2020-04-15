export const isEmptyObject = (target: object) => {
    return Object.keys(target).length === 0;
};

export const EmptyObject: { [key: string]: any } = {};
export const EmptyArray: any[] = [];

export function isNumber(value?: string | number) {
    return /^\d+$/.test(String(value));
}

export const clearEmptyVal = (data: any): any => {
    if (typeof data !== 'object') {
        return data;
    }
    if (Array.isArray(data)) {
        return data
            .filter(item => {
                return item !== '' && item !== undefined && item !== null;
            })
            .map(item => clearEmptyVal(item));
    } else {
        let result = {} as any;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key];
                if (val !== '' && val !== undefined && val !== null) {
                    result[key] = clearEmptyVal(val);
                }
            }
        }
        return result;
    }
};
