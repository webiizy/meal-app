import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CategoryMealScreen = (props) => {
  console.log(props);
  props.navigation.setOptions({
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  });
  const { itemId } = props.route.params;
  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen! id={itemId}</Text>

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
