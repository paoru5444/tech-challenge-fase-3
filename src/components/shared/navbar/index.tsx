import ChevronLeft from "@/assets/icons/chevron-left.png";
import { images } from "@/src/constants";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface TitleProps {
  showHeader?: boolean;
}

export default function Navbar({ showHeader }: TitleProps) {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.navbar}>
      {showHeader ? (
        <Image source={images.logo} style={styles.navbar__image} />
      ) : (
        <TouchableOpacity
          onPress={handleGoBack}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            zIndex: 99999,
          }}
          hitSlop={25}
        >
          <Image source={ChevronLeft} style={{ width: 6, height: 12 }} />
        </TouchableOpacity>
      )}
    </View>
  );
}
