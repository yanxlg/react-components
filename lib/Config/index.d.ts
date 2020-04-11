declare let config: {
    defaultPageNumber: number;
    defaultPageSize: number;
    defaultPageNumberKey: string;
    defaultPageSizeKey: string;
};
declare const Config: (
    conf: Partial<{
        defaultPageNumber: number;
        defaultPageSize: number;
        defaultPageNumberKey: string;
        defaultPageSizeKey: string;
    }>,
) => void;
export default Config;
export { config };
