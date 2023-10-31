import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import React, { useState, useEffect } from 'react';

import { getTest } from '../services/TestRouterService'

const OtherPage = ({ navigation }: { navigation: any }) => {
    const [testData, setTestData] = useState('');

    useEffect(() => {
        getTestData();
    }, []);

    const getTestData = () => {
        getTest()
        .then((data: any) => { 
            setTestData(data.message); })
        .catch((error: any) => { setTestData('uh oh') });
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Return from API: {testData}</Text>
        <Button
            title="Go to HomePage"
            onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

export default OtherPage;