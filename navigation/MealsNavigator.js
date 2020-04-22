import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";

import { Icon } from "../components";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
//const Top = createMaterialTopTabNavigator();

function TabStack(props) {
  const tabPress = (e) => {
    global.currenRouter = e.target.split("-")[0];
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      shifting={true}
      barStyle={{
        backgroundColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={CategoriesScreen}
        listeners={{ tabPress }}
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="home" size={26} />
          ),
        }}
      />

      {/* <Tab.Screen name="Template" component={TemplateStackScreen} listeners={{ tabPress }} /> */}
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        listeners={{ tabPress }}
        options={{
          title: "Tin Nhắn",
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="comment" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        listeners={{ tabPress }}
        options={{
          title: "Tài Khoản",
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="account-circle" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="App"
        component={TabStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
  );
};
