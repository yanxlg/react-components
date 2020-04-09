import React from "react";
import { RouteComponentProps } from "react-router";
declare interface IRouter {
    path: string;
    extract?: boolean;
    live?: boolean;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
declare interface ILivePagesProps extends RouteComponentProps {
    routers: IRouter[];
}
declare const LivePages: React.FC<ILivePagesProps>;
export default LivePages;
