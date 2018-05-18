import { createContext } from 'react';

const currentUserContext = createContext({ name: 'Default User' });

export {
    currentUserContext
};
