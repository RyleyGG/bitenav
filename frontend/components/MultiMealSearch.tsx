import { SearchBar, Input, CheckBox, Icon, Button} from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, StyleProp } from 'react-native';
import { sendSearch } from "../services/SearchMealService";
import DisplayMeal from "./DisplayMeal";
import { getMeals } from "../services/TestSearchFunction";
import { getMultiMeals } from "../services/MultiMealService";
import { MealSearchFilters, MealSearchResult } from "../models/MealSearch";
import { ReturnedMeals } from "../models/MealSearch";
import globalStyles from "../GlobalStyles";
import NotificationBox from "./NotificationBox";
import Ionicons from '@expo/vector-icons/Ionicons';




const MultiMealSearch = (props:any) => {
  //input data
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState("");
  const [highProtein, setHighProtein] = useState(false);
  const [lowCarb, setLowCarb] = useState(false);
  const [lowFat, setLowFat] = useState(false);
  const [offset, setOffset] = useState(0);

  //output data
  //const [returnedMeals, setReturnedMeals] = useState<MealSearchResult[] |null>(null);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [photolink, setPhotolink] = useState("");

  const [dataIsValid, setDataIsValid] = React.useState(false);
  const [displayNotif, setDisplayNotif] = React.useState(false);
  const [notifSuccess, setNotifSuccess] = React.useState(false);
  const [notifText, setNotifText] = React.useState('');

  const dropdownData = [
    {label: 'Vegan', value: 'Vegan'},
    {label: 'Gluten-Free', value: 'Gluten-Free'},
    {label: 'Whole 30', value: 'Whole 30'},
    {label: 'Keto', value: 'Keto'}
  ]

  // Everytime a name is entered the checkDataValidity function will run
  useEffect(() => {
    checkDataValidity();
  }, [search]);

  useEffect(() => {
    updateData;
  }, [setOffset]);

  // This function will check that the search field exist
  const checkDataValidity = () => {

    if (!search) {
        setDataIsValid(false);
    }
    else {
        setDataIsValid(true);
    }
  }

  const updateSearch = (search: any) => {
    setSearch(search)
  }

  const updateData = async () => {
    getMultiMeals({
      'name': search,
      'diet': diet,
      'highProtein': highProtein,
      'lowCarb': lowCarb,
      'lowFat': lowFat,
      'cuisine': '',
      'allergies': '',
      'offset': String(offset)

    })
    .then((data: any) => {
      //setReturnedMeals(data)

      setName(data.name);
      setCalories(data.calories);
      setProtein(data.protein);
      setCarbs(data.carbs);
      setFat(data.fat);
      setPhotolink(data.photolink)

      setNotifText(data.name)
      setNotifSuccess(true);
      setDisplayNotif(true);

      setTimeout((
      ) => {
          //navigation.navigate('Search');
      }
      , 3000)
    })
    .catch((error: any) => {
      setNotifText('There was an error processing the search. Please try again.')
      setNotifSuccess(false);
      setDisplayNotif(true);
    });
  }

  const handleCloseNotif = () => {
    setDisplayNotif(false);
  }
  const pageChange = (change: string) => {
    if(change === "increment") {
      setOffset((prevState) => prevState + 1);
    }
    else if(change === "decrement") {
      setOffset((prevState) => prevState - 1);
    }
    updateData();
    setDisplayNotif(false);
  }


  return (
    <View style={{  display: 'flex', flexDirection: 'column' }}>
    <View style={{ display: 'flex',flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <SearchBar 
        style={{backgroundColor: 'white'}}
        inputContainerStyle={{ backgroundColor: 'white', borderColor: 'transparent' }}
        containerStyle={{ backgroundColor: 'white' }}
        leftIconContainerStyle={{ display: 'none' }}
        rightIconContainerStyle={{ display: 'none' }}
        inputStyle={{ borderBottomColor: 'red' }}
        placeholder="Search Here"
        onChangeText={updateSearch}
        value={search}
        />

      <Button
        onPress={()=> updateData()}
        title={'Submit'} 
        />
    </View>

    <View style={{ display: 'flex',flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> 
      <Dropdown 
        data={dropdownData}
        labelField="label"
        valueField='value'
        placeholder="Select Diet"
        value={diet}
        onChange={item => {
          setDiet(item.value)
          console.log(diet)
        }}
        />
      
      <View style={{ width: "75%", display: 'flex', flexDirection: 'column' }}>
        <CheckBox
          title='High Protein' 
          checked={highProtein}
          checkedIcon={
            <Ionicons name="radio-button-on" type="material" color="blue" size={26} />
          }
          uncheckedIcon={
            <Ionicons name="radio-button-off" type="material" color="green" size={26}/>
          }
          onPress={()=> setHighProtein(!highProtein)}
          />
          
          <CheckBox
            title='Low Carb' 
            checked={lowCarb}
            checkedIcon={
              <Ionicons name="radio-button-on" type="material" color="blue" size={26} />
            }
            uncheckedIcon={
              <Ionicons name="radio-button-off" type="material" color="green" size={26}/>
            }
            onPress={()=>setLowCarb(!lowCarb)}
            />

          <CheckBox
            title='Low Fat' 
            checked={lowFat}
            checkedIcon={
              <Ionicons name="radio-button-on" type="material" color="blue" size={26} />
            }
            uncheckedIcon={
              <Ionicons name="radio-button-off" type="material" color="green" size={26}/>
            }
            onPress={()=>setLowFat(!lowFat)}
            />
      </View>
      <Button
        onPress={()=> pageChange('increment')}
        title={'Next Page'} 
        />
      <Button
        onPress={()=> pageChange('decrement')}
        title={'Prev Page'} 
        />
      <div>Page: {offset}</div>
      
    </View>



    {displayNotif ? (
      notifSuccess ? (
        <DisplayMeal 
        title={name}
        calories={calories}
        fat={fat}
        protein={protein}
        carbs={carbs}
        photolink={photolink}
        />) 
        : (<NotificationBox
        content={notifText}
        isVisible={displayNotif}
        onClose={handleCloseNotif}
        isSuccess={notifSuccess}
      />)
    ) : (<></>)}

  </View>
  
);
};

export default MultiMealSearch;
