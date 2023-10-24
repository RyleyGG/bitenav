import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { SignInInfo, SignUpInfo } from './models/Auth';

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: boolean;
    requestSignup: (signupObj: SignUpInfo) => any;
    requestSignin: (signinObj: SignInInfo) => any;
    initiateSignOut: () => any;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial state based on previous sessions if you want
    const [url, setUrl] = useState('http://localhost:8000/auth')

    useEffect(() => {
        userIsAuthenticated();
    }, []);
    
    const userIsAuthenticated = () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
    
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        if (tokenPayload.exp < Date.now() / 1000) {
            setIsAuthenticated(false);
            return;
        }
    
        setIsAuthenticated(true);
    };

    const initiateSignOut = () => {
        localStorage.removeItem('token');
        userIsAuthenticated();
    }
    
    
    const requestSignup = async (signupObj: SignUpInfo) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupObj)
            };
            const response = await fetch(`${url}/sign_up`, requestOptions);
    
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
    
            const res = await response.json();
            localStorage.setItem('token', res.access_token);
        } catch (error) {
            console.error("There was a problem fetching the data: ", error);
            throw error;
        }
    };
    
    const requestSignin = async (signinObj: SignInInfo) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signinObj)
            };
            const response = await fetch(`${url}/sign_in`, requestOptions);
    
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
    
            const res = await response.json();
            localStorage.setItem('token', res.access_token);
        } catch (error) {
            console.error("There was a problem fetching the data: ", error);
            throw error;
        }

        userIsAuthenticated();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, requestSignup, requestSignin, initiateSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};