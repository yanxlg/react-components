/// <reference types="react" />
import { FormItemName } from '../index';
import { FormInstance } from 'antd/es/form';
export declare type HideType = 'hide';
export declare type HideItemProps<T = string> = {
    form: FormInstance;
    type: HideType;
    name: FormItemName<T>;
    initialValue?: any;
};
/**
 * 隐藏元素，通常用于保存数据
 * @constructor
 */
declare const HideItem: {
    ({ form, type, name, initialValue }: HideItemProps): JSX.Element;
    typeList: string[];
};
export default HideItem;
