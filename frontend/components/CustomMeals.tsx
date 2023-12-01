import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  deleteCustomMeal,
  postCustomMeal,
} from "../services/CustomMealService";
import { getCustomMeal } from "../services/CustomMealService";
import { CustomMeal } from "../models/CustomMeal";

const CreateMealForm = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [showMealForm, setShowMealForm] = useState(true);
  const [allMeals, setAllMeals] = useState<CustomMeal[]>([]);
  const [mealCreated, setMealCreated] = useState(false);
  const [mealDeleted, setMealDeleted] = useState(false);
  const [formData, setFormData] = useState({
    Userid: null,
    id: null,
    name: name,
    calories: calories,
    fat: fat,
    carbs: carbs,
    protein: protein,
  });

  const [dataIsValid, setDataIsValid] = useState(false);

  useEffect(() => {
    checkDataValidity();
  }, [formData]);

  const checkDataValidity = () => {
    const { name, calories, protein, carbs, fat } = formData;
    setDataIsValid(!!name && !!calories && !!protein && !!carbs && !!fat);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCreateMeal = async (e: any) => {
    e.preventDefault();
    if (dataIsValid) {
      postCustomMeal(formData)
        .then((data: any) => {
          setMealCreated(true);
          setTimeout(() => {
            setMealCreated(false);
          }, 800);
        })
        .catch((err: any) => {});
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleDeleteMeal = async (mealName: string) => {
    if (window.confirm(`Are you sure you want to delete ${mealName}?`)) {
      await deleteCustomMeal(mealName)
        .then((data: any) => {
          setAllMeals((prevMeals) =>
            prevMeals.filter((meal) => meal.name !== mealName)
          );
          setMealCreated(false);
          setMealDeleted(true);
          setTimeout(() => {
            setMealDeleted(false);
          }, 800);
          console.log("Meal deleted");
        })
        .catch((err: any) => {
          alert("Error deleting meal");
        });
    }
  };

  const filterMealByCalories = (allMeals: any) => {
    const filteredMeals = allMeals.filter(
      (meal: any) => meal.calories <= calories
    );
    console.log(filteredMeals);
    return filteredMeals;
  };

  const handleGetMeals = async () => {
    getCustomMeal()
      .then((data: any) => {
        setAllMeals(data);
        setShowMealForm(false);
      }
      )
      .catch((err: any) => {
        alert("Error getting meals");
        console.log(err);
      });
  };

  return (
    <div>
      {showMealForm}
      <div style={{ padding: "3rem", maxWidth: "32rem", margin: "auto" }}>
        {showMealForm && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "0.25rem",
            }}
          >
            <h1
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: "600",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              Create Meal Form
            </h1>
            <input
              type="text"
              placeholder="Enter meal name"
              value={formData.name}
              id="name"
              onChange={handleChange}
              style={{ padding: "0.5rem", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Enter calories"
              value={formData.calories}
              id="calories"
              onChange={handleChange}
              style={{ padding: "0.5rem", border: "1px solid #ccc" }}
            />

            <input
              type="text"
              placeholder="Enter fat"
              value={formData.fat}
              id="fat"
              onChange={handleChange}
              style={{ padding: "0.5rem", border: "1px solid #ccc" }}
            />

            <input
              type="text"
              placeholder="Enter protein"
              value={formData.protein}
              id="protein"
              onChange={handleChange}
              style={{ padding: "0.5rem", border: "1px solid #ccc" }}
            />

            <input
              type="text"
              placeholder="Enter carbs"
              value={formData.carbs}
              id="carbs"
              onChange={handleChange}
              style={{ padding: "0.5rem", border: "1px solid #ccc" }}
            />

            <button
              type="submit"
              onClick={handleCreateMeal}
              style={{
                backgroundColor: "#2d3b4e",
                color: "white",
                padding: "1rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Create Meal
            </button>
          </form>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "0.25rem",
          }}
        >
          {showMealForm && (
            <h1
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: "600",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              View Custom Meals
            </h1>
          )}
          {showMealForm && (
            <button
              onClick={handleGetMeals}
              style={{
                backgroundColor: "#2d3b4e",
                color: "white",
                padding: "1rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              View Meals
            </button>
          )}
          {mealCreated && showMealForm && (
            <div>
              <h1
                style={{
                  color: "green",
                  textAlign: "center",
                  fontWeight: "600",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Meal Created!
              </h1>
            </div>
          )}
        </div>
      </div>

      {!showMealForm && (
        <div style={{ padding: "3rem", maxWidth: "32rem", margin: "auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "0.25rem",
            }}
          >
            <button
              onClick={() => setShowMealForm(true)}
              style={{
                backgroundColor: "#2d3b4e",
                color: "white",
                padding: "1rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Create Meal
            </button>
            {allMeals.map((meal, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "rgb(179, 229, 255)",
                  padding: "1rem",
                  borderRadius: "0.25rem",
                }}
              >
                <button
                  onClick={() => meal.name && handleDeleteMeal(meal.name)}
                  style={{
                    backgroundColor: "#2d3b4e",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "0.25rem",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Delete Meal
                </button>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: "1rem", fontWeight: "600" }}>
                        Meal Name:
                      </td>
                      <td style={{ fontSize: "1rem", textAlign: "right" }}>
                        {meal.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "1rem", fontWeight: "600" }}>
                        Calories:
                      </td>
                      <td style={{ fontSize: "1rem", textAlign: "right" }}>
                        {meal.calories}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "1rem", fontWeight: "600" }}>
                        Fat:
                      </td>
                      <td style={{ fontSize: "1rem", textAlign: "right" }}>
                        {meal.fat}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "1rem", fontWeight: "600" }}>
                        Protein:
                      </td>
                      <td style={{ fontSize: "1rem", textAlign: "right" }}>
                        {meal.protein}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "1rem", fontWeight: "600" }}>
                        Carbs:
                      </td>
                      <td style={{ fontSize: "1rem", textAlign: "right" }}>
                        {meal.carbs}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          {mealDeleted && (
            <h1
              style={{
                color: "green",
                textAlign: "center",
                fontWeight: "600",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              Meal Deleted!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateMealForm;
