import { SearchBar } from "@rneui/themed";
import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Button } from '@rneui/base';

const { width, height } = Dimensions.get('window');

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
    <View style={{ 
    backgroundColor: 'rgb(179, 229, 255)', 
    padding: 30, 
    display: 'flex',
    alignItems:'center',
    height: height > width ? 0.70 * height : 0.2 * height, 
    borderRadius: 0.05 * width,
    borderWidth: 0.02 * width,
    borderColor: 'blue'
    }}>
        {/* TODO: Update UI here to use relative terms instead of absolute */}
      <View style={{ display:'flex', flexDirection: "column", justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Image source={{ uri: `${props.photolink}` }}  style={{ width: 0.22 * width, height: 0.22 * width }}></Image>
          <Text style={{ fontSize: 25 }}>{props.title}</Text>
          <Text>Calories per serving: {props.calories}</Text>
          <Text>Fat: {props.fat} g</Text>
          <Text>Protein: {props.protein} g</Text>
          <Text>Carbs: {props.carbs} g</Text>
      </View>
    </View>
  );
};

export default DisplayMeal;
