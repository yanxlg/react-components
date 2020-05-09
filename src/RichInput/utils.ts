export const numberFormatter = (value?: string | number) =>
    typeof value === 'number'
        ? String(value)
        : value
        ? (/^\d+(\.\d*)?/.exec(value) || [''])[0]
        : '';

export const intFormatter = (value?: string | number) =>
    typeof value === 'number' ? String(value) : value ? (/^\d+/.exec(value) || [''])[0] : '';

export const positiveIntFormatter = (value?: string | number) =>
    typeof value === 'number' ? String(value) : value ? (/^[1-9]\d*/.exec(value) || [''])[0] : '';

export const numberSplit = (value?: string | number) =>
    typeof value === 'number' ? String(value) : value ? (/^\d+\,?\d*/.exec(value) || [''])[0] : '';

export const naturalNumber = (value?: string | number) =>
    typeof value === 'number'
        ? String(value)
        : value
        ? (/^-?\d+(\.\d*)?/.exec(value) || [''])[0]
        : '';
