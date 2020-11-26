import React, { useCallback, useMemo, useState } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import btnStyles from './_btn.less';
import classNames from 'classnames';
import useUpdate from '../hooks/useUpdate';

declare interface ILoadingButtonProps extends ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any> | void;
}

const LoadingButton: React.FC<ILoadingButtonProps> = ({
    loading: outerLoading,
    icon,
    className,
    onClick: onDefaultClick,
    ..._props
}) => {
    const [loading, setLoading] = useState<boolean>(!!outerLoading);

    const onClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // 根据result 类型判断是否需要loading
            if (onDefaultClick) {
                const result = onDefaultClick(event);
                if (result) {
                    if (result['then']) {
                        // promise
                        setLoading(true);
                    }
                    if (result['finally']) {
                        result['finally'](() => {
                            setLoading(false);
                        });
                    } else {
                        setLoading(false);
                    }
                }
            }
        },
        [onDefaultClick],
    );

    useUpdate(() => {
        setLoading(!!outerLoading);
    }, [outerLoading]);

    return useMemo(() => {
        return (
            <Button
                {..._props}
                icon={icon}
                className={classNames(className, icon ? btnStyles.btnWithoutAnim : '')}
                loading={loading}
                onClick={onClick}
            />
        );
    }, [_props, loading, onDefaultClick, icon, className]);
};

export default LoadingButton;
