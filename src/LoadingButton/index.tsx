import React, { useCallback, useMemo, useState } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import btnStyles from './_btn.less';
import classNames from 'classnames';

declare interface ILoadingButtonProps extends ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any>;
}

const LoadingButton: React.FC<ILoadingButtonProps> = props => {
    const [loading, setLoading] = useState(false);
    const { loading: outerLoading, icon, className, ..._props } = props;
    const onClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // 如果没有onClick则不执行任何操作
            if (props.onClick && !props['_privateClick']) {
                // tooltip会添加onClick,_privateClick表示onClick不是正常情况下添加，私有属性
                setLoading(true);
                props.onClick(event).finally(() => {
                    setLoading(false);
                });
            }
        },
        [props.onClick],
    );
    const currentLoading = outerLoading || loading;
    return useMemo(() => {
        return (
            <Button
                {..._props}
                icon={icon}
                className={classNames(className, icon ? btnStyles.btnWithoutAnim : '')}
                loading={currentLoading}
                onClick={onClick}
            />
        );
    }, [props, currentLoading, onClick]);
};

export default LoadingButton;
