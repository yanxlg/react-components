import React, { ReactElement } from 'react';
import { LazyImageProps } from '../LazyImage';
declare type IAutoEnLargeImgProps = {
    className?: string;
    enLargeClassName?: string;
    src?: string;
    srcList?: string[];
    enlargeContent?: ReactElement;
} & LazyImageProps;
declare const AutoEnLargeImg: React.FC<IAutoEnLargeImgProps>;
export default AutoEnLargeImg;
