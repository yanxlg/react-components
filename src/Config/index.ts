let config = {
    defaultPageNumber: 1,
    defaultPageSize: 50,
    defaultPageNumberKey: 'page',
    defaultPageSizeKey: 'page_count',
};

const Config = (conf: Partial<typeof config>) => {
    Object.assign(config, conf);
};

export default Config;

export { config };
