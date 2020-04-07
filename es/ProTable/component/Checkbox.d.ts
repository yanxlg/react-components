/**提供自我管控的Checkbox**/
import React from 'react';
import { CheckboxProps } from 'antd/es/checkbox/Checkbox';
export interface CheckboxRef {
    updateChecked: (checked: boolean) => void;
    setIndeterminate: () => void;
    getValue: () => any;
    getValues: () => {
        value: any;
        checked: boolean;
    };
}
declare const _default: React.ForwardRefExoticComponent<Pick<CheckboxProps, "autoFocus" | "disabled" | "name" | "value" | "onChange" | "defaultChecked" | "className" | "id" | "style" | "tabIndex" | "children" | "onKeyDown" | "onKeyPress" | "onClick" | "onMouseEnter" | "onMouseLeave" | "prefixCls" | "indeterminate"> & {
    componentWillUnMont: (value: string) => void;
} & React.RefAttributes<CheckboxRef>>;
export default _default;
