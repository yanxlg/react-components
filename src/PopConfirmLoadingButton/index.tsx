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
    ...others
}) => {
    const [loading, setLoading] = useState(false);
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
            <Popconfirm {...popConfirmProps} onConfirm={onConfirm} {...others}>
                <span>
                    <Button {...buttonProps} loading={loading} />
                </span>
            </Popconfirm>
        );
    }, [popConfirmProps, buttonProps, loading]);
};

export default PopConfirmLoadingButton;
