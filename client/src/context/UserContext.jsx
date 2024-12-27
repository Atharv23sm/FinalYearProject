import React, { createContext, useEffect, useState, useContext } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged , setIsLogged] = useState(false);
    const [adminId, setadminId] = useState(() => localStorage.getItem('adminId'));

    useEffect(() => {
        const storedAdminId = localStorage.getItem('adminId');
        setadminId(storedAdminId);
    }, []);

    useEffect(() => {
        if (adminId !== null) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [adminId]); 

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, adminId , setadminId }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)