import React, { ReactElement, useMemo } from 'react';
import { Popover } from 'antd';
import styles from './_index.less';
import LazyImage from '../LazyImage';

declare interface IAutoEnLargeImgProps {
    className?: string;
    enLargeClassName?: string;
    src?: string;
    enlargeContent?: ReactElement;
}

const AutoEnLargeImg: React.FC<IAutoEnLargeImgProps> = ({
    className = '',
    enLargeClassName = '',
    src,
    children,
    enlargeContent,
}) => {
    return useMemo(() => {
        return src || children ? (
            <Popover
                placement="right"
                content={
                    src ? (
                        <img
                            src={src.replace('150_150', '240_240')}
                            alt=""
                            className={`${styles.enlarge} ${enLargeClassName}`}
                        />
                    ) : (
                        enlargeContent
                    )
                }
                title={null}
                autoAdjustOverflow={true}
            >
                {src ? (
                    <LazyImage src={src} className={className} alt="" />
                ) : (
                    // <img src={src} className={className} alt="" />
                    (children as React.ReactElement)
                )}
            </Popover>
        ) : null;
    }, [className, enLargeClassName, src]);
};

export default AutoEnLargeImg;
