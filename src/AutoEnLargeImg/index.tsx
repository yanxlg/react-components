import React, { ReactElement, useMemo } from 'react';
import { Popover, Carousel } from 'antd';
import LazyImage, { LazyImageProps } from '../LazyImage';
import styles from './_index.less';

type IAutoEnLargeImgProps = {
    className?: string;
    enLargeClassName?: string;
    src?: string;
    srcList?: string[];
    enlargeContent?: ReactElement;
    noLazy?: boolean;
} & LazyImageProps;

const AutoEnLargeImg: React.FC<IAutoEnLargeImgProps> = ({
    className = '',
    enLargeClassName = '',
    src,
    srcList,
    children,
    enlargeContent,
    noLazy,
    ...props
}) => {
    return useMemo(() => {
        if (Array.isArray(srcList) && srcList.length > 0) {
            return (
                <Popover
                    placement="right"
                    content={() => (
                        <div style={{ width: 240, height: 240 }}>
                            <Carousel style={{ position: 'relative' }}>
                                {srcList.map(val => (
                                    <div key={val}>
                                        <img
                                            src={val?.replace('150_150', '240_240')}
                                            alt=""
                                            className={`${styles.enlarge} ${enLargeClassName}`}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    )}
                    title={null}
                    autoAdjustOverflow={true}
                >
                    <LazyImage src={srcList[0]} className={className} alt="" {...props} />
                </Popover>
            );
        }

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
                    noLazy ? (
                        <img src={src} className={className} alt="" {...props} />
                    ) : (
                        <LazyImage src={src} className={className} alt="" {...props} />
                    )
                ) : (
                    (children as React.ReactElement)
                )}
            </Popover>
        ) : null;
    }, [className, enLargeClassName, src]);
};

export default AutoEnLargeImg;
