import { SearchBar, Input, CheckBox, Icon, Button} from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { sendSearch } from "../services/SearchMealService";
import DisplayMeal from "./DisplayMeal";
import { getMeals } from "../services/TestSearchFunction";
import { MealSearchFilters } from "../models/MealSearch";
import globalStyles from "../GlobalStyles";
import NotificationBox from "./NotificationBox";




const SearchMeal = (props:any) => {
  //input data
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState("");
  const [highProtein, setHighProtein] = useState(false);
  const [lowCarb, setLowCarb] = useState(false);
  const [lowFat, setLowFat] = useState(false);

  //output data
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

  useEffect(() => {
    checkDataValidity();
  }, [search]);

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
    getMeals({
      'name': search,
      'diet': diet,
      'highProtein': highProtein,
      'lowCarb': lowCarb,
      'lowFat': lowFat
    })
    .then((data: any) => {
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


  return (
    <View style={{  display: 'flex', flexDirection: 'column' }}>
      <View style={{ display: 'flex',flex: '1', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <SearchBar 
          style={{backgroundColor: 'white'}}
          inputContainerStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: 'white' }}
          placeholder="Search Here"
          onChangeText={updateSearch}
          value={search}
        />

        <Button
          onPress={()=> updateData()}
          title={'Submit'} 
        />
      </View>


      <View style={{ display: 'flex',flex: '1', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> 
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
              <Icon name="radio-button-checked" type="material" color="blue" />
            }
            uncheckedIcon={
              <Icon name="radio-button-unchecked" type="material" color="green" />
            }
            onPress={()=> setHighProtein(!highProtein)}
            />
            
            <CheckBox
              title='Low Carb' 
              checked={lowCarb}
              checkedIcon={
                <Icon name="radio-button-checked" type="material" color="blue" />
              }
              uncheckedIcon={
                <Icon name="radio-button-unchecked" type="material" color="green" />
              }
              onPress={()=>setLowCarb(!lowCarb)}
            />

            <CheckBox
              title='Low Fat' 
              checked={lowFat}
              checkedIcon={
                <Icon name="radio-button-checked" type="material" color="blue" />
              }
              uncheckedIcon={
                <Icon name="radio-button-unchecked" type="material" color="green" />
              }
              onPress={()=>setLowFat(!lowFat)}
            />
        </View>
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

export default SearchMeal;
