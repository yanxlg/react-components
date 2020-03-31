import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps,matchPath } from 'react-router';
import styles from './_index.less';

declare interface IRouter{
    path: string;
    extract?: boolean;
    live?: boolean;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

declare interface ILivePagesProps extends RouteComponentProps {
    routers: IRouter[];
}

type IRouterListItem = IRouter & RouteComponentProps & {
    mounted: boolean;
}

const LivePages: React.FC<ILivePagesProps> = ({ routers, location, history, ...props }) => {
    let routerList = useMemo<IRouterListItem[]>(() => [], []); // cache

    const getRouterList = useCallback(() => {
        let activeIndex: number | undefined = undefined;
        routers.forEach((router, index) => {
            const match = matchPath(location.pathname, router);
            const route = routerList[index] || { ...router } as IRouterListItem;
            if (match && match.isExact) {
                route.match = match;
                if (activeIndex === void 0) {
                    activeIndex = index;
                }
            }
            route.location = location;
            route.history = history;
            routerList[index] = {
                ...props,
                ...route,
                mounted: route.mounted || activeIndex === index,
            };
        });
        return {
            routerList: routerList,
            activeIndex,
        };
    }, [location.pathname]);

    return useMemo(() => {
        const { activeIndex, routerList } = getRouterList();
        return (
            <React.Fragment>
                {routerList.map(
                    ({ component: Component, live, mounted, path, ...props }, index) => {
                        const show = activeIndex === index;
                        const render = (live && mounted) || show;
                        return render ? (
                            <div key={path} className={show ? styles.pageShow : styles.hide}>
                                <Component {...props} />
                            </div>
                        ) : null;
                    },
                )}
            </React.Fragment>
        );
    }, [location.pathname]);
};

export default LivePages;
