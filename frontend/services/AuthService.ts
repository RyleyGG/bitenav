import { SignUpInfo } from "../models/Auth";
import * as SecureStore from 'expo-secure-store';
import { MealFilters } from "../models/Meals";

const url: string = 'http://localhost:8000/auth';

export const userIsAuthenticated = () => {
    /* todo -- auth logic here */
    return false;
};

export const requestSignup = async (signupObj: SignUpInfo) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupObj)
        };
        const response = await fetch(`${url}/sign_up`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();
        localStorage.setItem('token', res.access_token);
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
};

export const requestSignin = async () => {
    return;
}