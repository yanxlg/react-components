import React from 'react';
import { FormInstance } from 'antd/es/form';
export declare type CustomFragmentType = 'component';
export declare interface CustomFragmentProps {
    type: CustomFragmentType;
    form: FormInstance;
    Component: React.FC<{
        form?: FormInstance;
    }> | React.ComponentClass<{
        form?: FormInstance;
    }>;
    names: string[];
}
declare const CustomFragment: {
    ({ form, Component }: CustomFragmentProps): JSX.Element;
    typeList: string[];
};
export default CustomFragment;
