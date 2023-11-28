import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { MealSearchFilters, MealSearchResult } from '../models/MealSearch';
import httpClient from '../HttpClient';
import { API_URL } from '@env'

const url = `${API_URL}/meal`;

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