/**
 * 通过配置生成api service，供简单使用
 */
interface ApiServiceConfig {
    path: string;
    method?: string;
    query?: any;
    responsePath?: string[];
}
