import React, { forwardRef } from 'react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
// import styles from '../../temp/JsonForm/_form.less';
import { Skeleton } from 'antd';

const LazyImage = (
    {
        scrollContainer = '.ant-table-body',
        className,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & {
        scrollContainer?: string | Element | undefined;
    },
    ref: any,
) => {
    return (
        <LazyLoad
            scrollContainer={scrollContainer}
            offset={100}
            throttle={true}
            placeholder={
                <Skeleton.Input
                    active={true}
                    className={classNames(className, "inline-block")}
                />
            }
        >
            <img {...props} className={className} />
        </LazyLoad>
    );
};

export default forwardRef(LazyImage);
