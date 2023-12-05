import { SearchBar } from "@rneui/themed";
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, Button } from '@rneui/base';
import { ListItem } from '@rneui/themed';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 50,
    }, 
    item: {
        padding: 20,
        fontSize: 15,
        marginTop: 5,
    }
});

const DisplayMultiMeal = (list: any) => {
  
  return (
    
    <View style={styles.container}>
    {
        list.map((meal:any) => {
            return (
                <View>
                    <text style={styles.item}>{meal.name}</text>
                </View>
            );
        }
        //(
        // <ListItem key={i} bottomDivider>
            
        //     <ListItem.Content>
        //         <ListItem.Title>{l.name}</ListItem.Title>
        //         <ListItem.Subtitle>{l.calories}</ListItem.Subtitle>
        //         <ListItem.Subtitle>{l.protein}</ListItem.Subtitle>
        //         <ListItem.Subtitle>{l.carbs}</ListItem.Subtitle>
        //         <ListItem.Subtitle>{l.fat}</ListItem.Subtitle>
        //     </ListItem.Content>
        // </ListItem>

        //)
        )
    }
    </View>
  );
}

export default DisplayMultiMeal;
