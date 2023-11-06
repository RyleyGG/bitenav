import { API_URL } from '@env'
import axios from 'axios';
import httpClient from '../HttpClient';


export const getTest = async () => {
    try {
        const response = await httpClient.get('/');
        return response;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
    }
}