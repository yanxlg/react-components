/// <reference types="react" />
import { FormInstance, FormItemProps, Rule } from 'antd/es/form';
import { FormatterType } from '../../../utils/formatter';
import { NamePath } from 'rc-field-form/lib/interface';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
export declare type DateRangerType = 'dateRanger@2';
export declare type DateRangerProps = Omit<FormItemProps, 'children' | 'rules' | 'name'> & {
    form: FormInstance;
    type: DateRangerType;
    className?: string;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: [NamePath, NamePath];
    formatter?: [FormatterType] | [FormatterType, FormatterType];
    rules?: [Rule[]] | [Rule[], Rule[]];
    labelClassName?: string;
    initialValue?: [any] | [any, any];
    childrenProps?: Omit<PickerProps<Dayjs>, 'onChange'>;
};
declare const FormDateRanger: {
    (props: DateRangerProps): JSX.Element;
    typeList: string[];
};
export default FormDateRanger;
