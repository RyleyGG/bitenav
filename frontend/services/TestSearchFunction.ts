import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { MealSearchFilters, MealSearchResult } from '../models/MealSearch';
import httpClient from '../HttpClient';

const url: string = 'http://localhost:8000/meal';

export const getMeals = async (mealObj: MealSearchFilters) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await httpClient.post(`${url}/search`, mealObj, requestOptions);

        return response;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
}