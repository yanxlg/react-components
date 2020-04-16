import { useCallback, useRef, useState } from 'react';

function useLoadingState(initState: boolean = false): [boolean, (loading: boolean) => void] {
    const [loadingState, setLoadingState] = useState(initState);
    const loadingCount = useRef(initState ? 1 : 0);

    const setLoading = useCallback((loading: boolean) => {
        const count = loadingCount.current;
        if (loading === true) {
            if (count === 0) {
                setLoadingState(true);
            }
            loadingCount.current += 1;
        }
        if (loading === false) {
            if (count === 1) {
                setLoadingState(false);
            }
            if (count > 0) {
                loadingCount.current -= 1;
            }
        }
    }, []);

    return [loadingState, setLoading];
}

export default useLoadingState;
