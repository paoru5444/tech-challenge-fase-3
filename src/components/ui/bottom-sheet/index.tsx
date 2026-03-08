import useCategories from "@/src/hooks/useCategories";
import React, { useEffect } from "react";
import { View } from "react-native";
import Badge from "../bedge";

export default function BottomSheet() {
  const { getCategories, categories } = useCategories();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <View>
      {/* <Text>Jujuba</Text> */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {Object.entries(categories).map(([key, value]) => (
          <Badge key={key} label={value} />
          // <Text key={key}>{value}</Text>
        ))}
      </View>
    </View>
  );
}
