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
    <div style={{ 
    backgroundColor: 'rgb(179, 229, 255)', 
    padding: '30px', 
    display: 'flex',
    alignItems:'center',
    margin: '10px', 
    height: '20rem', 
    marginTop: '5rem',
    borderRadius: '5rem',
    border: '2rem blue'
    }}>
      <View style={{display:'flex', flexDirection: "column", justifyContent: 'space-evenly', padding: '30px', alignItems: 'center' }}>
          <Image source={{ uri: `${props.photolink}` }}  style={{ width: '200px', height: '200px' }}></Image>
          <Text style={{ fontSize: '25px' }}>{props.title}</Text>
          <Text>Calories per serving: {props.calories}</Text>
          <Text>Fat: {props.fat} g</Text>
          <Text>Protein: {props.protein} g</Text>
          <Text>Carbs: {props.carbs} g</Text>
      </View>
    </div>
  );
};

export default DisplayMeal;
