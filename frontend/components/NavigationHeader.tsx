import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';
import { AuthContext } from '../AuthContext';


const NavigationHeader = ({ navigation }: { navigation: any }) => {
    const authContext = useContext(AuthContext);
    const { initiateSignOut } = useContext(AuthContext);

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
            <Button 
                title="Sign Out" 
                type="clear" 
                onPress={initiateSignOut}
            />
        </View>
    );
};

export default NavigationHeader;
