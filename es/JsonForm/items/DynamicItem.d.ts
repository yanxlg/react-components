/// <reference types="react" />
import { FormField } from '../index';
import { FormInstance } from 'antd/es/form';
import { ShouldUpdate } from 'rc-field-form/es/Field';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
export declare type DynamicType = 'dynamic';
export declare interface DynamicItemProps {
    type: DynamicType;
    form: FormInstance;
    dynamic: (form: FormInstance) => FormField;
    shouldUpdate: ShouldUpdate;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
}
declare const DynamicItem: {
    ({
        form,
        dynamic,
        shouldUpdate,
        labelClassName,
        itemCol,
        itemRow,
    }: DynamicItemProps): JSX.Element;
    typeList: string[];
};
export default DynamicItem;
