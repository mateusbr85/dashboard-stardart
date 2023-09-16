import React,{ createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

const AuthProvider = ({children}: any) => {
    const [state, setState] = useState({});

    return (
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider,AuthContext}