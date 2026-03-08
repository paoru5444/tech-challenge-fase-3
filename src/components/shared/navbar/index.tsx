import ChevronLeft from "@/assets/icons/chevron-left.png";
import Avatar from "@/assets/images/avatar.png";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Typography from "../../ui/typography";
import { styles } from "./styles";

interface TitleProps {
  title?: string;
}

export default function Navbar({ title }: TitleProps) {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.navbar}>
      {title ? (
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
        >
          <Image source={ChevronLeft} style={{ width: 6, height: 12 }} />
          <Typography style={{ fontWeight: 600, fontSize: 16 }}>
            {title}
          </Typography>
        </TouchableOpacity>
      ) : (
        <>
          <Image source={Avatar} style={styles.navbar__image} />

          <View>
            <Text style={styles.navbar_greetings}>Hello</Text>
            <Text style={styles.navbar_username}>Livia Vaccaro</Text>
          </View>
        </>
      )}
    </View>
  );
}
