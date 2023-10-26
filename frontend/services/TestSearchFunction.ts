import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { MealSearchFilters, MealSearchResult } from '../models/MealSearch';

const url: string = 'http://localhost:8000/meal';

export const getMeals = async (mealObj: MealSearchFilters) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mealObj)
        };
        const response = await fetch(`${url}/search`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        throw error;
    }
}