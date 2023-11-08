import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Button } from '@rneui/base';

import { MealSearchFilters } from '../models/MealSearch';
import globalStyles from '../GlobalStyles';
import NotificationBox from '../components/NotificationBox';
import { getMeals } from '../services/TestSearchFunction'
import SearchMeal from '../components/SearchMeal';
import DisplayMeal from '../components/DisplayMeal';


const SearchPage = ({ navigation }: { navigation: any }) => {

      
    const [name, setName] = React.useState('');
    const [dataIsValid, setDataIsValid] = React.useState(false);

    const [displayNotif, setDisplayNotif] = React.useState(false);
    const [notifSuccess, setNotifSuccess] = React.useState(false);
    const [notifText, setNotifText] = React.useState('');

    useEffect(() => {
        checkDataValidity();
    }, [name]);

    const checkDataValidity = () => {

        if (!name) {
            setDataIsValid(false);
        }
        else {
            setDataIsValid(true);
        }
    }

    const initiateSearch = async () => {
        getMeals({
            'name': name
        })
        .then((data: any) => {
            setNotifText(data.name)
            setNotifSuccess(true);
            setDisplayNotif(true);

            setTimeout((
            ) => {
                navigation.navigate('Search');
            }
            , 3000)
        })
        .catch((error: any) => {
            setNotifText('Oops! There was an error processing the search. Please try again.')
            setNotifSuccess(false);
            setDisplayNotif(true);
        });
    }

    const handleCloseNotif = () => {
        setDisplayNotif(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
                placeholder="Meal Name"
                onChangeText={setName}
                style={globalStyles.basicInputField}
            />
            <Button
                title="Search"
                onPress={initiateSearch}
                disabled={!dataIsValid}
            />

            {displayNotif ? (
            <NotificationBox
                isVisible={displayNotif}
                isSuccess={notifSuccess}
                content={notifText}
                onClose={handleCloseNotif}
            />): (<></>)}
            <SearchMeal></SearchMeal>
            
        </View>
    );
}

export default SearchPage;