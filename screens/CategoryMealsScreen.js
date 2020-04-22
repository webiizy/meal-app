import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";

const CategoryMealScreen = (props) => {
  console.log(props);

  const { myId } = props.route.params;
  const meal = CATEGORIES.find((cat) => cat.id === myId);

  props.navigation.setOptions({
    title: meal.title,
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen! id={myId}</Text>
      <Text>Meal: {meal.title}</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          props.navigation.navigate("MealDetail");
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
