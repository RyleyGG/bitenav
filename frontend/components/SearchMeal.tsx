import { SearchBar, Input, CheckBox, Icon, Button, Dialog } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions } from 'react-native';
import DisplayMeal from "./DisplayMeal";
import { getMeals } from "../services/MealService";
import globalStyles from "../GlobalStyles";
import NotificationBox from "./NotificationBox";
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

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

  const [debounceTimeout, setDebounceTimeout] = useState<number | NodeJS.Timeout | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // TODO: move this model to a centralized place
  const dropdownData = [
    {label: 'Vegan', value: 'Vegan'},
    {label: 'Gluten-Free', value: 'Gluten-Free'},
    {label: 'Whole 30', value: 'Whole 30'},
    {label: 'Keto', value: 'Keto'},
    {label: 'None', value: ''}
  ]

  useEffect(() => {
    checkDataValidity();
  }, [search]);

  useEffect(() => {
    return () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
    };
  }, [debounceTimeout]);

  const checkDataValidity = () => {

    if (!search) {
        setDataIsValid(false);
    }
    else {
        setDataIsValid(true);
    }
  }

  const updateSearch = async (inputSearch: any) => {
    setSearch(inputSearch);
    setShowLoader(false);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (inputSearch != '') {
      setShowLoader(true);
      const newTimeout = setTimeout(() => {
        updateData(inputSearch);
      }, 3000);

      setDebounceTimeout(newTimeout);
    }
  }

    const updateData = async (inputSearch: any) => {
      getMeals({
        'name': inputSearch,
        'diet': diet,
        'highProtein': highProtein,
        'lowCarb': lowCarb,
        'lowFat': lowFat,
        'cuisine': '',
        'allergies': ''

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

        setShowLoader(false);
      })
      .catch((error: any) => {
        setNotifText('There was an error processing the search. Please try again.');
        setNotifSuccess(false);
        setDisplayNotif(true);
      });
  }

  const handleCloseNotif = async () => {
    setDisplayNotif(false);
}

  const handleFilterModalOpen = async () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setShowLoader(false);
    setShowFilterModal(true);
  }
  
  const handleFilterApply = () => {
      setShowFilterModal(false);
      if (search) {
          setShowLoader(true);
          updateData(search);
      }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Dialog
        isVisible={showFilterModal}
        onBackdropPress={() => setShowFilterModal(false)}
        overlayStyle={globalStyles.basicDialog}
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* TODO: Change this and backend functionality to be multiselect */}
            <Text style={{fontWeight: "bold"}}>Diet</Text>
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
            
            <View style={{ width: "75%", display: 'flex', flexDirection: 'column', marginTop: 0.02 * height }}>
            <Text style={{fontWeight: "bold"}}>Macronutrients</Text>
              <CheckBox
                title='High Protein' 
                checked={highProtein}
                checkedIcon={<Ionicons name="radio-button-on" type="material" color="blue" size={26} />}
                uncheckedIcon={<Ionicons name="radio-button-off" type="material" color="green" size={26}/>}
                onPress={()=> setHighProtein(!highProtein)}
              />
              
              <CheckBox
              title='Low Carb' 
              checked={lowCarb}
              checkedIcon={<Ionicons name="radio-button-on" type="material" color="blue" size={26} />}
              uncheckedIcon={<Ionicons name="radio-button-off" type="material" color="green" size={26}/>}
              onPress={()=>setLowCarb(!lowCarb)}
              />

              <CheckBox
              title='Low Fat' 
              checked={lowFat}
              checkedIcon={<Ionicons name="radio-button-on" type="material" color="blue" size={26} />}
              uncheckedIcon={<Ionicons name="radio-button-off" type="material" color="green" size={26}/>}
              onPress={()=>setLowFat(!lowFat)}
              />
            </View>
        </View>
        <Button onPress={handleFilterApply}>Apply</Button>
      </Dialog>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0.015 * width }}>
        <SearchBar 
          inputContainerStyle={{ backgroundColor: 'white', borderColor: 'transparent' }}
          searchIcon={<Ionicons name="md-search" size={18} color="black" />}
          clearIcon={<Ionicons name="close-outline" size={18} color="black" onPress={() => updateSearch('')} />}
          showLoading={showLoader}
          placeholder="Search Meals & Ingredients..."
          containerStyle={{ ...globalStyles.basicInputField, width: 0.75 * width }}
          onChangeText={ updateSearch }
          value={search}
        />
        <Ionicons name="filter" size={18} color="black" onPress={ handleFilterModalOpen }/>
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
