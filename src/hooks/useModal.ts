import {useCallback, useState} from "react";

function useModal<T = string>() {
    const [visible, setVisible] = useState<T | false>(false);

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const setVisibleProps = useCallback((visibleProps: T) => {
        setVisible(visibleProps);
    }, []);

    return {
        visible,
        onClose,
        setVisibleProps,
    };
}

export default useModal;