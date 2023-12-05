import { SearchBar, Input, CheckBox, Icon, Button, Dialog } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import DisplayMeal from "./DisplayMeal";
import { getMeals, getMultiTest } from "../services/MealService";
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
  const [offset, setOffset] = useState(0);

  //output data
  const [returnedMeals, setReturnedMeals] = useState([]);

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
        setOffset(0);
        updateData(inputSearch);
      }, 3000);

      setDebounceTimeout(newTimeout);
    }
  }

    const updateData = async (inputSearch: any, offsetParam:number=0) => {
      console.log(offsetParam)
      getMeals({
        'name': inputSearch,
        'diet': diet,
        'highProtein': highProtein,
        'lowCarb': lowCarb,
        'lowFat': lowFat,
        'cuisine': '',
        'allergies': '',
        'offset': String(offsetParam)

      })
      .then((data: any) => {
        setReturnedMeals(data)

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

  const handlePageChange = (change: string) => {
    let offsetLocal = offset

    if(change === "increment" && offset <= 97) {
      offsetLocal += 3
      setOffset(offsetLocal);
    }
    else if(change === "decrement" && offset != 0) {
      offsetLocal -= 3
      setOffset(offsetLocal);
    }

    updateData(search, offsetLocal);
  }

  const pageChange = (change: string) => {

  }

  const pressHandler = (meal: any) =>{
    console.log(meal.id);
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
          
          <View style={styles.container}>
             <Button style={{marginBottom: 5}}
              onPress={()=> handlePageChange('increment')}
              title={'Next Page'} 
              />
            <Button
              onPress={()=> handlePageChange('decrement')}
              title={'Prev Page'} 
         />
            <SafeAreaView/>
              {
                <FlatList 
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  keyExtractor={(item)=>item.id}
                  data={returnedMeals}
                  renderItem={({item})=>(
                    <View>
                      <Text style={styles.title}>{item.name}</Text>
                      <TouchableOpacity onPress={()=>pressHandler(item)}>
                        <Image source = {{uri:item.photolink}} style={{height: 200, width:200 }}/>
                      </TouchableOpacity>
                      <View style={styles.meals}>
                        <Text >Calories: {item.calories}</Text>
                        <Text >Protein: {item.protein}g</Text>
                        <Text >Carbs: {item.carbs}g</Text>
                        <Text >Fat: {item.fat}g</Text>
                      </View>
                    </View>
                  )}
                  //ItemSeparatorComponent={()=><View style={styles.Separator}></View>}
                />  
              }
          </View>
        ) 
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

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'rgb(179, 229, 255)',
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",  
    flex: 1,
    padding: 20,
    borderColor: "black",
    borderRadius: 2,
    marginBottom: 1
  }, 
  meals: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start", 
      padding: 20,
      fontSize: 15,
      marginTop: 1,
      marginBottom: 10
  },
  Separator: {
    height: 2,
    backgroundColor: "black"
  },
  title: {
    display: "flex", 
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5
  },
  buttons: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    gap: 5
}
});