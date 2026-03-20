import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5F33E1",
        tabBarStyle: {
          backgroundColor: "#FDFDFD",
          height: 70,
        },
        sceneStyle: { backgroundColor: "#FDFDFD" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={16} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions-list"
        options={{
          title: "Transações",
          tabBarIcon: ({ color }) => (
            <Ionicons name="swap-horizontal-outline" color={color} size={16} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={16} />
          ),
        }}
      />
    </Tabs>
  );
}
