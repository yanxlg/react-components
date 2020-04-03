import React, {forwardRef} from 'react';
import LazyLoad, {LazyLoadProps} from 'react-lazyload';
import classNames from 'classnames';
import {Skeleton} from 'antd';
import formStyles from "../JsonForm/_form.less";


export type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & Omit<LazyLoadProps, "children" | "placeholder">;

const LazyImage = (
    {
        className,
        once,
        height,
        offset = 100,
        overflow = true,
        resize,
        scroll,
        throttle = true,
        debounce,
        scrollContainer,
        unmountIfInvisible,
        preventLoading,
        ...props
    }: LazyImageProps,
    ref: any,
) => {
    return (
        <LazyLoad
            scrollContainer={scrollContainer}
            once={once}
            height={height}
            offset={offset}
            overflow={overflow}
            resize={resize}
            scroll={scroll}
            debounce={debounce}
            throttle={throttle}
            unmountIfInvisible={unmountIfInvisible}
            preventLoading={preventLoading}
            placeholder={
                <Skeleton.Input
                    active={true}
                    className={classNames(className, formStyles.inlineBlock)}
                />
            }
        >
            <img {...props} className={className}/>
        </LazyLoad>
    );
};

export default forwardRef(LazyImage);
