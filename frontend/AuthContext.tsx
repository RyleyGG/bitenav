import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { SignInInfo, SignUpInfo } from './models/Auth';
import httpClient from './HttpClient';

import { API_URL } from '@env'
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: boolean;
    requestSignup: (signupObj: SignUpInfo) => any;
    requestSignin: (signinObj: SignInInfo, keepLoggedIn: boolean) => any;
    initiateSignOut: () => any;
    refreshTokenStatus: () => any;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial state based on previous sessions if you want
    const [url, setUrl] = useState(`${API_URL}/auth`)

    useEffect(() => {
        userIsAuthenticated();
        httpClient.setAuthErrorCallback(() => {
            initiateSignOut();
        });
        httpClient.setGetTokensCallback((token_name: string) => {
            const res = getToken(token_name)
            return res;
        });
        httpClient.setSetTokenCallback((access_token: string, refresh_token: string) => {
            const res = setTokens(access_token, refresh_token);
            return res;
        });
    }, []);
    
    const userIsAuthenticated = () => {
        const token = getToken('access_token');
    
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

    const getToken = (token_name: string) => {
        let token = localStorage.getItem(token_name);

        if (!token || token === 'undefined') {
            token = sessionStorage.getItem(token_name);
        }

        if (!token || token === 'undefined') {
            return '';
        }

        return token;
    }

    const setTokens = (accessToken: string, refreshToken: string) => {
        if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
        }
        else if (sessionStorage.getItem('access_token') && sessionStorage.getItem('refresh_token')) {
            sessionStorage.setItem('access_token', accessToken);
            sessionStorage.setItem('refresh_token', refreshToken);
        }
        else {
            return false;
        }

        return true;
    }

    const initiateSignOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        userIsAuthenticated();
    }
    
    
    const requestSignup = async (signupObj: SignUpInfo) => {
        try {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await httpClient.post(`${url}/sign_up`, signupObj, requestOptions);
        } catch (error) {
            console.error("There was a problem fetching the data: ", error);
            throw error;
        }
    };
    
    const requestSignin = async (signinObj: SignInInfo, keepLoggedIn: boolean) => {
        try {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json' },
            };
            
            const res = await httpClient.post(`${url}/sign_in`, signinObj, requestOptions);

            if (keepLoggedIn) {
                localStorage.setItem('access_token', res.access_token);
                localStorage.setItem('refresh_token', res.refresh_token);
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
            }
            else {
                sessionStorage.setItem('access_token', res.access_token);
                sessionStorage.setItem('refresh_token', res.refresh_token);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        } catch (error) {
            console.error("There was a problem fetching the data: ", error);
            throw error;
        }

        userIsAuthenticated();
    }

    const refreshTokenStatus = () => {
        const token = localStorage.getItem('access_token');
        
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, requestSignup, requestSignin, initiateSignOut, refreshTokenStatus }}>
            {children}
        </AuthContext.Provider>
    );
};