import React from "react";
import "./index.less";
export interface TableAlertProps {
    selectedRowKeys?: (number | string)[];
    alertInfoRender?: ((selectedRowKeys: (number | string)[]) => React.ReactNode) | false;
    onCleanSelected?: () => void;
    alertOptionRender?: false | ((props: { onCleanSelected?: () => void }) => React.ReactNode);
}
export interface TableAlertRef {
    updateSelectedState: (selectedRowKeys: (string | number)[]) => void;
}
declare const _default: React.ForwardRefExoticComponent<TableAlertProps &
    React.RefAttributes<TableAlertRef>>;
export default _default;
