import ChevronLeft from "@/assets/icons/chevron-left.png";
import Avatar from "@/assets/images/avatar.png";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface TitleProps {
  showHeader?: boolean;
}

export default function Navbar({ showHeader }: TitleProps) {
  const handleGoBack = () => {
    console.log("voltando");
    router.back();
  };

  return (
    <View style={styles.navbar}>
      {showHeader ? (
        <>
          <Image source={Avatar} style={styles.navbar__image} />

          <View>
            <Text style={styles.navbar_greetings}>Hello</Text>
            <Text style={styles.navbar_username}>Livia Vaccaro</Text>
          </View>
        </>
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
