import { SearchBar } from "@rneui/themed";
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from '@rneui/base';

type DisplayMealProps = {
    title?: string;
    servings?: string;
    readyInMinutes?: string;
    calories?: string;
    fat?: string;
    protein?: string;
    carbs?: string;
    photolink?: string;
}

const DisplayMeal = (props: DisplayMealProps) => {
  
  return (
    <View style={{ flexDirection: "column" ,marginLeft: 20, justifyContent: 'space-evenly', padding: '30px' }}>
        <Image source={{ uri: `${props.photolink}` }}  style={{ width: '200px', height: '200px' }}></Image>
        <Text style={{ fontSize: '25px' }}>{props.title}</Text>
        <Text>Calories per serving: {props.calories}</Text>
        <Text>Fat: {props.fat}</Text>
        <Text>Protein: {props.protein}</Text>
        <Text>Carbs: {props.carbs}</Text>
    </View>
  );
};

export default DisplayMeal;
