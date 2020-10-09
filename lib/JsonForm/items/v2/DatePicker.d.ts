/// <reference types="react" />
import { FormInstance, FormItemProps } from 'antd/es/form';
import { NamePath } from 'rc-field-form/lib/interface';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import { FormatterType } from '../../../utils/formatter';
import { FormItemName } from '../../index';
export declare type DatePickerType = 'datePicker@2';
export declare type DatePickerProps<T = string> = FormItemProps & {
    type: DatePickerType;
    form: FormInstance;
    onChange?: (name: NamePath, form: FormInstance) => void;
    name: NamePath;
    formatter?: FormatterType;
    labelClassName?: string;
    dateBeginWith?: Array<FormItemName<T> | 'now'>;
    dateEndWith?: Array<FormItemName<T> | 'now'>;
    childrenProps?: Omit<PickerProps<Dayjs>, 'onChange'>;
};
declare const FormDatePicker: {
    (props: DatePickerProps): JSX.Element;
    typeList: string[];
};
export default FormDatePicker;
