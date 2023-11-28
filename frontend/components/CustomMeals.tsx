import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

import { postCustomMeal } from "../services/CustomMealService";


const CreateMealForm = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");

  const [dataIsValid, setDataIsValid] = React.useState(false);
  const [displayNotif, setDisplayNotif] = React.useState(false);
  const [notifSuccess, setNotifSuccess] = React.useState(false);
  const [notifText, setNotifText] = React.useState("");

  useEffect(() => {
    checkDataValidity();
  }, [name, calories, protein, carbs, fat]);

  const checkDataValidity = () => {
    if (!name || !calories || !protein || !carbs || !fat) {
      setDataIsValid(false);
    } else {
      setDataIsValid(true);
    }
  };

  const handleCreateMeal = async () => {
    if (dataIsValid) {
      postCustomMeal({
        Userid: null,
        id: null,
        name: name,
        calories: calories,
        fat: fat,
        carbs: carbs,
        protein: protein,
      })
        .then((data: any) => {
          setNotifText(data.name);
          setNotifSuccess(true);
          setDisplayNotif(true);
        })
        .catch((err: any) => {
          setNotifText(err);
          setNotifSuccess(false);
          setDisplayNotif(true);
        });
    } else {
      setNotifText("Please fill out all fields");
      setNotifSuccess(false);
      setDisplayNotif(true);
    }
  };

  const handleGetMeals = () => {
    console.log("Show meals");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter meal name"
      />

      <Text style={styles.label}>Calories:</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="Enter calories"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Fats:</Text>
      <TextInput
        style={styles.input}
        value={fat}
        onChangeText={setFat}
        placeholder="Enter fats"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Carbs:</Text>
      <TextInput
        style={styles.input}
        value={carbs}
        onChangeText={setCarbs}
        placeholder="Enter carbs"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Protein:</Text>
      <TextInput
        style={styles.input}
        value={protein}
        onChangeText={setProtein}
        placeholder="Enter protein"
        keyboardType="numeric"
      />

      <Button title="Create Meal" onPress={handleCreateMeal} />

      <Text style={styles.label}>Custom Meals:</Text>
      <Button title="View Custom Meals" onPress={handleShowMeals} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default CreateMealForm;
