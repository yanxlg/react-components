import React from 'react';
import { ButtonProps } from 'antd/lib/button/button';
declare interface ILoadingButtonProps extends ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any> | void;
}
declare const LoadingButton: React.FC<ILoadingButtonProps>;
export default LoadingButton;
