import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { postCustomMeal } from "../services/CustomMealService";
import { getCustomMeal } from "../services/CustomMealService";
import { CustomMeal } from "../models/CustomMeal";

const CreateMealForm = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [allMeals, setAllMeals] = useState<CustomMeal[]>([]);

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

  const handleGetMeals = async () => {
    getCustomMeal()
      .then((data: any) => {
        setAllMeals(data);
      })
      .catch((err: any) => {
        setNotifText(err);
        setNotifSuccess(false);
        setDisplayNotif(true);
      });
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

      <Text style={styles.label}></Text>
      <Button title="View Custom Meals" onPress={handleGetMeals} />

      <View style={styles.mealsContainer}>
        {allMeals.map((meal, index) => (
          <View key={index} style={styles.mealItemContainer}>
            <Text style={styles.mealItemLabel}>Meal Name: {meal.name}</Text>
            <Text style={styles.mealItemLabel}>Calories: {meal.calories}</Text>
            <Text style={styles.mealItemLabel}>Fat: {meal.fat}</Text>
            <Text style={styles.mealItemLabel}>Protein: {meal.protein}</Text>
            <Text style={styles.mealItemLabel}>Carbs: {meal.carbs}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1600,
    margin: "auto",
    padding: 50, // Increase padding for overall size
    backgroundColor: "white",
  },
  label: {
    fontSize: 18, // Increase font size for labels
    marginBottom: 8, // Increase margin for labels
    color: "gray",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16, // Increase margin for input fields
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  mealsContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    flexWrap: "wrap",
  },
  mealItemContainer: {
    backgroundColor: "#eee",
    padding: 16,
    margin: 12, // Increase margin for meal items
    borderRadius: 8,
    width: "100%",
  },
  mealItemLabel: {
    fontWeight: "bold",
    fontSize: 16, // Increase font size for meal item labels
  },
});
export default CreateMealForm;
