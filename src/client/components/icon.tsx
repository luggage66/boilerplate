import * as React from 'react';

export const Icon = ({ icon }: { icon: string; }) => {
    return <span
        className={`mdi mdi-${icon}`}
    />;
}