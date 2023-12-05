import { MealSearchFilters, MealSearchResult } from '../models/MealSearch';
import httpClient from '../HttpClient';
import { API_URL } from '@env'

const url = `${API_URL}/meal`;

export const getMultiMeals = async (mealObj: MealSearchFilters) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await httpClient.post(`${url}/MultiSearch`, mealObj, requestOptions);

        return response;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
}

export const getMultiTest = async (mealObj: MealSearchFilters) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await httpClient.post(`${url}/MultiSearchTest`, mealObj, requestOptions);

        return response;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
}