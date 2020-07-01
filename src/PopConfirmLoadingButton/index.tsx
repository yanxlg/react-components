import React, { useCallback, useMemo, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { ButtonProps } from 'antd/lib/button/button';

declare interface IPopConfirmProps extends PopconfirmProps {
    onConfirm: (e?: React.MouseEvent<HTMLElement>) => Promise<any>;
}
declare interface IPopConfirmLoadingButtonProps {
    popConfirmProps: IPopConfirmProps;
    buttonProps: ButtonProps;
}

const PopConfirmLoadingButton: React.FC<IPopConfirmLoadingButtonProps> = ({
    popConfirmProps,
    buttonProps,
    ...props
}) => {
    const [loading, setLoading] = useState(false);
    const privateClick = !!props['_privateClick']; // 权限组件控制
    const permissionClick = props['onClick']; // 权限组件强制设置的click事件
    const disabled = popConfirmProps.disabled || privateClick;

    const onConfirm = useCallback(
        (e?: React.MouseEvent<HTMLElement>) => {
            setLoading(true);
            popConfirmProps?.onConfirm(e).finally(() => {
                setLoading(false);
            });
        },
        [popConfirmProps?.onConfirm],
    );

    return useMemo(() => {
        return (
            <Popconfirm {...popConfirmProps} onConfirm={onConfirm} disabled={disabled}>
                <span>
                    <Button {...buttonProps} loading={loading} onClick={permissionClick} />
                </span>
            </Popconfirm>
        );
    }, [popConfirmProps, buttonProps, loading, disabled]);
};

export default PopConfirmLoadingButton;
