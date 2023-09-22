import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import React, { useState, useEffect } from 'react';

import { getTest } from '../services/TestRouterService'

const OtherPage = ({ navigation }: { navigation: any }) => {
    const [testData, setTestData] = useState(null);

    useEffect(() => {
        getTestData();
    }, []);

    const getTestData = () => {
        getTest()
        .then((data: any) => { 
            console.log(data);
            setTestData(data); })
        .catch((error: any) => { setTestData(error) });
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Return from Test Router: {testData}</Text>
        <Button
            title="Go to HomePage"
            onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

export default OtherPage;