/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { SwitchProps as AntSwitchProps } from 'antd/es/switch';
import { NamePath } from 'rc-field-form/lib/interface';
export declare type SwitchType = 'switch@2';
export declare type SwitchProps<T = string> = Omit<FormItemProps, 'children'> & {
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: NamePath;
    labelClassName?: string;
    type: SwitchType;
    childrenProps?: Omit<AntSwitchProps, 'onChange'>;
    onValue?: string;
    offValue?: string;
};
declare const FormSwitch: {
    (props: SwitchProps<T>): JSX.Element;
    typeList: string[];
};
export default FormSwitch;
