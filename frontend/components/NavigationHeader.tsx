import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';

const NavigationHeader = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
        <Button 
        title="Home" 
        type="clear" 
        onPress={() => navigation.navigate('Home')}
        />
        <Button 
        title="Other" 
        type="clear" 
        onPress={() => navigation.navigate('Other')}
        />
    </View>
  );
};

export default NavigationHeader;
