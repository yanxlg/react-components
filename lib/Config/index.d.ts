declare let config: {
    defaultPageNumber: number;
    defaultPageSize: number;
    defaultWaterFallSize: number;
    defaultPageNumberKey: string;
    defaultPageSizeKey: string;
};
declare const Config: (conf: Partial<typeof config>) => void;
export default Config;
export { config };
