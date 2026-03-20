import Typography from "@/src/components/ui/typography";
import React from "react";
import { Image, View } from "react-native";

export default function EmptyTransactions({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: any;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 32,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <Image
        source={image}
        style={{ width: 200, height: 124, resizeMode: "contain" }}
      />

      <View style={{ gap: 6 }}>
        <Typography color="#24252C" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Typography size={12} color="#6E6A7C" style={{ textAlign: "center" }}>
          {description}
        </Typography>
      </View>
    </View>
  );
}
