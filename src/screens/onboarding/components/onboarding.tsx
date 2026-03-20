import ElipsesBackground from "@/src/components/shared/elipses-background";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import { images } from "@/src/constants";
import React from "react";
import { Image, View } from "react-native";

interface OnboardingProps {
  onPressGettingStarted: () => void;
}

export default function Onboarding({ onPressGettingStarted }: OnboardingProps) {
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
      <ElipsesBackground />

      <View style={{ width: "100%", height: 300, alignItems: "center" }}>
        <View
          style={{
            position: "absolute",
            width: "80%",
            height: 270,
            // backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={images.financeMoney}
              style={{ width: 70, height: 70, left: "20%", bottom: "50%" }}
            />
            <Image
              source={images.financeReport}
              style={{ width: 50, height: 50, right: "20%" }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={images.pieChartData}
              style={{ width: 45, height: 45, bottom: "20%", left: "5%" }}
            />
            <Image
              source={images.moneyTarget}
              style={{ width: 60, height: 60, right: "5%" }}
            />
          </View>
        </View>

        <Image
          source={images.onboarding}
          style={{ width: 232, height: 232, top: "20%" }}
        />
      </View>

      <View style={{ gap: 48 }}>
        <View style={{ gap: 16 }}>
          <Typography size={22} weight="600" style={{ textAlign: "center" }}>
            Gerencie & Organize{"\n"}Finanças de forma simples
          </Typography>
          <Typography
            style={{
              textAlign: "center",
              paddingHorizontal: 24,
            }}
            color="#AEAEB2"
          >
            Esta ferramenta produtiva foi desenvolvida para te ajudar a
            gerenciar melhor suas finanças pessoais de forma prática e
            conveniente!
          </Typography>
        </View>

        <Button onPress={onPressGettingStarted} label="Vamos Começar" />
      </View>
    </View>
  );
}
