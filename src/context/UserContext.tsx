import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children, userId }) => {
    return (
        <UserContext.Provider value={userId}>
            {children}
        </UserContext.Provider>
    );
};
