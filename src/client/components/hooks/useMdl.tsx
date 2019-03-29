import * as React from 'react';

export const useMdl = <TElement extends HTMLElement>() => {
    const elementRef = React.useRef<TElement>(null);

    React.useEffect(() => {
        componentHandler.upgradeElement(elementRef.current!);
        return () => componentHandler.downgradeElements(elementRef.current!);
    }, []);

    return elementRef;
};
