import React from 'react';
export declare interface UpdateContainerRef {
    update: (data: any) => void;
}
declare interface UpdateContainerProps<S> {
    children: (data: S | undefined) => React.ReactNode[] | null;
}
declare const _default: React.ForwardRefExoticComponent<UpdateContainerProps<any> & React.RefAttributes<UpdateContainerRef>>;
export default _default;
