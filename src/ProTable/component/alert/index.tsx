import React, {
    forwardRef,
    ForwardRefRenderFunction,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import { Alert } from 'antd';
import './index.less';

export interface TableAlertProps {
    selectedRowKeys?: (number | string)[];
    alertInfoRender?: ((selectedRowKeys: (number | string)[]) => React.ReactNode) | false;
    onCleanSelected?: () => void;
    alertOptionRender?:
        | false
        | ((props: { onCleanSelected?: () => void }) => React.ReactNode);
}

const defaultAlertOptionRender = (props: { onCleanSelected?: () => void }) => {
    const { onCleanSelected } = props;
    return [
        <a onClick={onCleanSelected} key="0">
            清空
        </a>,
    ];
};

export interface TableAlertRef {
    updateSelectedState: (selectedRowKeys: (string | number)[]) => void;
}

const TableAlert: ForwardRefRenderFunction<TableAlertRef, TableAlertProps> = (
    {
        selectedRowKeys = [],
        onCleanSelected,
        alertInfoRender = () => (
            <span>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            </span>
        ),
        alertOptionRender = defaultAlertOptionRender,
    }: TableAlertProps,
    ref,
) => {

    const [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState<(string | number)[]>([]);
    const _selectedRowKeys = selectedRowKeys !== void 0 ? selectedRowKeys : innerSelectedRowKeys;

    useImperativeHandle(
        ref,
        () => {
            return {
                updateSelectedState: (selectedRowKeys: (string | number)[]) => {
                    setInnerSelectedRowKeys(selectedRowKeys);
                },
            };
        },
        [],
    );

    const option =
        alertOptionRender &&
        alertOptionRender({
            onCleanSelected,
        });
    return useMemo(() => {
        return (
            <ConfigConsumer>
                {({ getPrefixCls }: ConfigConsumerProps) => {
                    const className = getPrefixCls('pro-table-alert');
                    if (alertInfoRender === false) {
                        return null;
                    }
                    const dom = alertInfoRender(_selectedRowKeys);
                    if (dom === false) {
                        return null;
                    }
                    return (
                        <div className={className}>
                            <Alert
                                message={
                                    <div className={`${className}-info`}>
                                        <div className={`${className}-info-content`}>{dom}</div>
                                        {option && (
                                            <div className={`${className}-info-option`}>
                                                {option}
                                            </div>
                                        )}
                                    </div>
                                }
                                type="info"
                                showIcon={true}
                            />
                        </div>
                    );
                }}
            </ConfigConsumer>
        );
    }, [_selectedRowKeys]);
};

export default forwardRef(TableAlert);
