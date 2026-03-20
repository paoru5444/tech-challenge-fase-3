import { images } from "@/src/constants";
import React from "react";
import { Dimensions, Image, View } from "react-native";

export default function ElipsesBackground() {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{
        width,
        height,
        position: "absolute",
        backgroundColor: "#FDFDFD",
        flex: 1,
      }}
    >
      <View style={{ alignItems: "flex-end" }}>
        <Image
          source={images.greenElispe}
          style={{
            width: 200,
            height: 200,
            right: -30,
            bottom: -20,
            resizeMode: "cover",
          }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={images.purpleElispe}
          style={{
            width: 220,
            height: 220,
            left: 20,
            bottom: 80,
            resizeMode: "cover",
          }}
        />
        <Image
          source={images.purpleElispe}
          style={{
            width: 120,
            height: 120,
            resizeMode: "cover",
            right: -60,
          }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Image
          source={images.yellowElispe}
          style={{
            width: 250,
            height: 250,
            right: -40,
            bottom: 120,
            resizeMode: "cover",
          }}
        />
      </View>

      <Image
        source={images.lightBlueElispe}
        style={{
          width: 250,
          height: 250,
          left: -70,
          bottom: 190,
          resizeMode: "cover",
        }}
      />
    </View>
  );
}
