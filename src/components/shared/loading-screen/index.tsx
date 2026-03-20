import React from "react";
import { ActivityIndicator, View } from "react-native";
import ElipsesBackground from "../elipses-background";

export default function LoadingScreen() {
  return (
    <>
      <ElipsesBackground />
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="##7B61E8" />
      </View>
    </>
  );
}
