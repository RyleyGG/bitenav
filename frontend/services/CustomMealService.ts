import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { CustomMeal } from '../models/CustomMeal';
import httpClient from '../HttpClient';
import { API_URL } from '@env';



export const postCustomMeal = async (mealObj: CustomMeal) => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await httpClient.post(`${API_URL}/meal/custom`, mealObj, requestOptions);

        return response;
    } catch (error) {
        console.error("There was a problem posting the data:", error);
        throw error;
    }
}


export const getCustomMeal = async () => {
  try {
      const requestOptions = {
          headers: { 'Content-Type': 'application/json' }
      };
      const response = await httpClient.get(`${API_URL}/meal/custom`, requestOptions);

      return response;
  } catch (error) {
      console.error("There was a problem posting the data:", error);
      throw error;
  }
}