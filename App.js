import React, { useState } from "react";
import { Platform, StatusBar } from "react-native";
import { GalioProvider, Text } from "galio-framework";
import { materialTheme } from "./constants/";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigation/MealsNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <NavigationContainer>
      <GalioProvider theme={materialTheme}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <MainStack />
      </GalioProvider>
    </NavigationContainer>
  );
}
