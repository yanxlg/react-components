import React from 'react';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { ButtonProps } from 'antd/lib/button/button';
declare interface IPopConfirmProps extends PopconfirmProps {
    onConfirm: (e?: React.MouseEvent<HTMLElement>) => Promise<any>;
}
declare interface IPopConfirmLoadingButtonProps {
    popConfirmProps: IPopConfirmProps;
    buttonProps: ButtonProps;
}
declare const PopConfirmLoadingButton: React.FC<IPopConfirmLoadingButtonProps>;
export default PopConfirmLoadingButton;
