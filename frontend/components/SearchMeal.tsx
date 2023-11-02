import { SearchBar, Input, CheckBox, Icon } from "@rneui/themed";
import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button  } from '@rneui/base';
import { sendSearch } from "../services/SearchMealService";
import DisplayMeal from "./DisplayMeal";



const SearchMeal = (props:any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [check1, setCheck1] = useState(false);
  const [maxFat, setMaxFat] = useState("");

  let searchData:any;
  
  const updateSearch = (search: any) => {
    setSearch(search)
  }

  const updateData = () => {
    setSearch(`search: ${search},` + `MaxFat: ${maxFat}`)
    searchData = sendSearch(search);
    ()=>setData(searchData);
    let dataObj = JSON.parse(data)

    //placeholder 
    return (
      <DisplayMeal
      title={dataObj.title}
      servings={dataObj.servings}
      readyInMinutes={dataObj.readyInMinutes}
      calories={dataObj.nutrients[0].amount}
      fat={dataObj.nutrients[1].amount}
      protein={dataObj.nutrients[8].amount}
      carbs={dataObj.nutrients[3].amount} />
    )

  }


  return (
    <View style={{ width: "75%" }}>
      <SearchBar 
      placeholder="Search Here"
      containerStyle={{}}
      onChangeText={updateSearch}
      value={search}
       >

      </SearchBar>
      <CheckBox
        title={<Input
          placeholder="Enter Max Fat:"
          value={maxFat}
          onChangeText={setMaxFat}
        >
          </Input>
          } 
        checked={check1}
        checkedIcon={
          <Icon name="radio-button-checked" type="material" color="blue" />
        }
        uncheckedIcon={
          <Icon name="radio-button-unchecked" type="material" color="green" />
        }
        onPress={()=>setCheck1(!check1)}

      >
      </CheckBox>

      <Button onPress={()=> updateData()}>

      </Button>

    </View>
  );
};

export default SearchMeal;
