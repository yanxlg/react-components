import React from 'react';
import { FormItemProps } from 'antd/es/form';
export declare type LabelType = 'label@2';
export declare type LabelProps<T = string> = Omit<FormItemProps, 'children'> & {
    type: LabelType;
    className?: string;
    labelClassName?: string;
    content: React.ReactNode;
    childProps?: {
        className?: string;
    };
};
declare const FormLabel: {
    (props: LabelProps): JSX.Element;
    typeList: string[];
};
export default FormLabel;
