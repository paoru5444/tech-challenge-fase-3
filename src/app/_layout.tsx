import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/auth.context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Lexend Deca": require("@/assets/fonts/lexend-deca/LexendDeca-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FDFDFD" }}
        edges={["top"]}
      >
        <Slot />
      </SafeAreaView>
    </AuthProvider>
  );
}
