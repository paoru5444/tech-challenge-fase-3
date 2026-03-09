import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/auth.context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display": require("@/assets/fonts/sf-pro/SF-Pro.ttf"),
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
