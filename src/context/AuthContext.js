import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Periksa token di `localStorage` saat aplikasi dimuat
        const user = JSON.parse(sessionStorage.getItem('user'));
        const token = user.role;
        token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, []);

    // const login = (token) => {
    //     localStorage.setItem('token', token);
    //     setIsLoggedIn(true);
    // };

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     setIsLoggedIn(false);
    // };

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
