import React, { ReactElement } from 'react';
declare interface IAutoEnLargeImgProps {
    className?: string;
    enLargeClassName?: string;
    src?: string;
    enlargeContent?: ReactElement;
    scrollContainer?: string | Element | undefined;
}
declare const AutoEnLargeImg: React.FC<IAutoEnLargeImgProps>;
export default AutoEnLargeImg;
