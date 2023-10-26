import { SearchBar } from "@rneui/themed";
import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import { sendSearch } from "../services/SearchMealService";
import DisplayMeal from "./DisplayMeal";



const SearchMeal = (props:any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("")
  let searchData:any;
  
  const updateSearch = (search: any) => {
    setSearch(search)
  }

  const updateData = () => {
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
      <Button onPress={()=> updateData()}>

      </Button>

    </View>
  );
};

export default SearchMeal;
