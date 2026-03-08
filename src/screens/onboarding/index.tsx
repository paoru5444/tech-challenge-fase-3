import { images } from "@/src/constants";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const handleGettingStarted = () => {
  router.push("/sign-in");
};

export default function Onboarding() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 60,
        paddingHorizontal: 16,
      }}
    >
      <Image source={images.onboarding} style={{ width: 232, height: 232 }} />

      <View style={{ gap: 48 }}>
        <View style={{ gap: 16 }}>
          <Text style={{ textAlign: "center", fontSize: 24, fontWeight: 600 }}>
            Gerencie & Analise{"\n"}Finanças Pessoais
          </Text>
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 24,
              fontSize: 14,
              color: "#AEAEB2",
            }}
          >
            Esta ferramenta produtiva foi desenvolvida para te ajudar a
            gerenciar melhor suas finanças pessoais de forma prática e
            conveniente!
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleGettingStarted}
          style={{
            backgroundColor: "#9260F4",
            height: 50,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
            Vamos Começar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
