import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import {
  useFonts,
  Inter_100Thin,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Routes from "./src/navigation/Routes";
import { AuthProvider } from "./src/hooks/Auth";
import {AppContext} from "./src/database/Realm";

export default function App() {

  const { RealmProvider } = AppContext;

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RealmProvider>
        <AuthProvider>
          <View style={{ flex: 1, backgroundColor: "#090909" }}>
            <Routes />
            <StatusBar backgroundColor="#3c8dbc" style="light" />
          </View>
        </AuthProvider>
      </RealmProvider>
    </GestureHandlerRootView>
  );
}
