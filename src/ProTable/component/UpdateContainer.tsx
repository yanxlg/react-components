import React, { forwardRef, Ref, useImperativeHandle, useMemo, useState } from 'react';

export declare interface UpdateContainerRef {
    update: (data: any) => void;
}

declare interface UpdateContainerProps<S> {
    children: (data: S | undefined) => React.ReactNode[] | null;
}

const UpdateContainer = ({ children }: UpdateContainerProps<any>, ref: Ref<UpdateContainerRef>) => {
    const [data, setData] = useState<any>();
    useImperativeHandle(
        ref,
        () => {
            return {
                update: data => {
                    setData(data);
                },
            };
        },
        [],
    );
    return useMemo(() => {
        return <span>{children(data)}</span>;
    }, [children, data]);
};

export default forwardRef(UpdateContainer);
