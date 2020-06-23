import React from 'react';
import { LazyLoadProps } from 'react-lazyload';
export declare type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & Omit<LazyLoadProps, "children" | "placeholder">;
declare const _default: React.ForwardRefExoticComponent<React.ImgHTMLAttributes<HTMLImageElement> & Pick<LazyLoadProps, "height" | "resize" | "scroll" | "offset" | "once" | "overflow" | "throttle" | "debounce" | "scrollContainer" | "unmountIfInvisible" | "preventLoading"> & React.RefAttributes<unknown>>;
export default _default;
