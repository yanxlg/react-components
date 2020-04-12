import React from 'react';
import { FormItemName } from '../index';
import { FormInstance } from 'antd/es/form';
import { Form } from 'antd';

const DateItem: React.FC<{ value?: any }> = ({ value }) => {
    return null;
};

export type HideType = 'hide';
const typeList = ['hide'];

export type HideItemProps<T = string> = {
    form: FormInstance;
    type: HideType;
    name: FormItemName<T>;
};

/**
 * 隐藏元素，通常用于保存数据
 * @constructor
 */
const HideItem = ({ form, type, name }: HideItemProps) => {
    return (
        <Form.Item noStyle={true} name={name}>
            <DateItem />
        </Form.Item>
    );
};

HideItem.typeList = typeList;

export default HideItem;
