import React, { ReactNode, createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionStorage from 'react-native-session-storage';
import { decode as atob, encode as btoa } from 'base-64'

import { SignInInfo, SignUpInfo } from './models/Auth';
import httpClient from './HttpClient';
import { API_URL } from '@env'

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: boolean;
    requestSignup: (signupObj: SignUpInfo) => Promise<any>;
    requestSignin: (signinObj: SignInInfo, keepLoggedIn: boolean) => Promise<any>;
    initiateSignOut: () => Promise<any>;
    refreshTokenStatus: () => Promise<any>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial state based on previous sessions if you want
    const [url, setUrl] = useState(`${API_URL}/auth`)

    useEffect(() => {
        const nestedAsyncFunc = async () => {
            await userIsAuthenticated();
            httpClient.setAuthErrorCallback(() => {
                initiateSignOut();
            });
            httpClient.setGetTokensCallback((token_name: string) => {
                return getToken(token_name);
            });
            httpClient.setSetTokenCallback((access_token: string, refresh_token: string) => {
                return setTokens(access_token, refresh_token);
            });
        }
        nestedAsyncFunc();
    }, []);

    const userIsAuthenticated = async () => {
        const token = await getToken('access_token');

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

    const getToken = async (token_name: string) => {
        let token = await AsyncStorage.getItem(token_name);

        if (!token || token === 'undefined') {
            token = SessionStorage.getItem(token_name);
        }

        if (!token || token === 'undefined') {
            return '';
        }

        return token;
    }

    const setTokens = async (accessToken: string, refreshToken: string) => {
        const existingAccessToken = await AsyncStorage.getItem('access_token');
        const existingRefreshToken = await AsyncStorage.getItem('refresh_token');

        if (existingAccessToken && existingRefreshToken) {
            await Promise.all([
                AsyncStorage.setItem('access_token', accessToken),
                AsyncStorage.setItem('refresh_token', refreshToken)
            ]);
        }
        else {
            SessionStorage.setItem('access_token', accessToken);
            SessionStorage.setItem('refresh_token', refreshToken);
        }

        return true;
    };

    const initiateSignOut = async () => {
        await Promise.all([
            AsyncStorage.removeItem('access_token'),
            AsyncStorage.removeItem('refresh_token'),
        ]);

        SessionStorage.removeItem('access_token'),
            SessionStorage.removeItem('refresh_token'),

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
                await Promise.all([
                    AsyncStorage.setItem('access_token', res.access_token),
                    AsyncStorage.setItem('refresh_token', res.refresh_token)
                ]);
                SessionStorage.removeItem('access_token'),
                    SessionStorage.removeItem('refresh_token')
            }
            else {
                SessionStorage.setItem('access_token', res.access_token);
                SessionStorage.setItem('refresh_token', res.refresh_token);
                await Promise.all([
                    AsyncStorage.removeItem('access_token'),
                    AsyncStorage.removeItem('refresh_token')
                ]);
            }
        } catch (error) {
            console.error("There was a problem fetching the data: ", error);
            throw error;
        }

        userIsAuthenticated();
    };

    const refreshTokenStatus = async () => {
        const token = await getToken('access_token');

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