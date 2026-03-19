import { icons } from "@/src/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C47FF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Image source={icons.home} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions-list"
        options={{
          title: "Transações",
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.switchIcon}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Image source={icons.profile} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
    </Tabs>
  );
}
