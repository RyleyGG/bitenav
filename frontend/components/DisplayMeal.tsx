import { SearchBar } from "@rneui/themed";
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';

type DisplayMealProps = {
    title?: string;
    servings?: string;
    readyInMinutes?: string;
    calories?: string;
    fat?: string;
    protein?: string;
    carbs?: string;
}

const DisplayMeal = (props: DisplayMealProps) => {
  
  return (
    <View style={{ flexDirection: "column" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
        <Text>Recipe: {props.title}</Text>
        <Text>Servings: {props.servings}</Text>
        <Text>Time to Cook: {props.readyInMinutes}</Text>
        <Text>Calories: {props.calories}</Text>
        <Text>Fat: {props.fat}</Text>
        <Text>Protein: {props.protein}</Text>
        <Text>Carbs: {props.carbs}</Text>


    </View>
  );
};

export default DisplayMeal;
