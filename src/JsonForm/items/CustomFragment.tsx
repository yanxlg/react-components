import React from 'react';
import { FormInstance } from 'antd/es/form';

export type CustomFragmentType = 'component';
const typeList = ['component'];

export declare interface CustomFragmentProps {
    type: CustomFragmentType;
    form: FormInstance;
    Component: React.FC<{ form: FormInstance }> | React.ComponentClass<{ form: FormInstance }>;
    names: string[]; // 必须要传，否则获取不到值
    props?: { [key: string]: any };
}

const CustomFragment = ({ form, Component, props }: CustomFragmentProps) => {
    return <Component form={form} {...props} />;
};

CustomFragment.typeList = typeList;

export default CustomFragment;
