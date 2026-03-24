import Badge from "@/src/components/ui/bedge";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import useCategories from "@/src/hooks/useCategories";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTransactionsContext } from "../context/transactionsContext";

export default function CategoriesList() {
  const { handleSelectedCategory } = useTransactionsContext();

  const [selectedCategory, setSelectedCategory] = useState({
    key: "",
    value: "",
  });

  const { getCategories, categories } = useCategories();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <View style={styles.container}>
      <View
        style={{
          minHeight: 200,
          paddingVertical: 40,
          paddingHorizontal: 32,
          gap: 16,
        }}
      >
        <Typography weight="600">Categorias: </Typography>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {Object.entries(categories).map(([key, value]) => (
            <Badge
              key={key}
              label={value}
              onPress={() => setSelectedCategory({ key, value })}
              isActive={key === selectedCategory.key}
            />
          ))}
        </View>

        <Button
          label="Selecionar"
          onPress={() => {
            handleSelectedCategory(selectedCategory);
            router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
